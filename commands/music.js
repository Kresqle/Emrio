const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const Discord = require("discord.js");

const queue = new Map();

module.exports = {
  name: "music",
  description: "play music inside Discord",
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    const serverQueue = queue.get(message.guild.id);
    if (args[0] === "play") {
      if (voiceChannel) {
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (permissions.has("CONNECT")) {
          if (permissions.has("SPEAK")) {
            if (args[1]) {
              let song = {};
              if (ytdl.validateURL(args[1])) {
                const songInfos = await ytdl.getInfo(args[1]);
                song = {
                  title: songInfos.videoDetails.title,
                  url: songInfos.videoDetails.url,
                };
              } else {
                const videoFinder = async (query) => {
                  const videoResult = await ytSearch(query);
                  return videoResult.videos.length > 1
                    ? videoResult.videos[0]
                    : null;
                };
                const video = await videoFinder(args.join(" "));
                if (video) {
                  song = {
                    title: video.title,
                    url: video.url,
                  };
                } else {
                  message.lineReply("I did not find the video.");
                }
                if (!serverQueue) {
                  const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: [],
                  };
                  queue.set(message.guild.id, queueConstructor);
                  queueConstructor.songs.push(song);
                  try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(
                      message,
                      message.guild,
                      queueConstructor.songs[0]
                    );
                  } catch (err) {
                    queue.delete(message.guild.id);
                    throw err;
                  }
                } else {
                  serverQueue.songs.push(song);
                  message.lineReply("Song added to the queue.");
                }
              }
            } else {
              message.lineReply("You need to spicify a song to play.");
            }
          } else {
            message.lineReply(
              "I do not have permission to speak in this channel."
            );
          }
        } else {
          message.lineReply(
            "I do not have permission to connect to this channel."
          );
        }
      } else {
        message.lineReply(
          "You have to be in a voice channel to use this command."
        );
      }
    } else if (args[0] === "skip") {
      skipSong(message, serverQueue);
    } else if (args[0] === "stop") {
      stopSong(message, serverQueue);
    }
  },
};

const videoPlayer = async (message, guild, song) => {
  const songQueue = queue.get(message.guild.id);
  if (song) {
    const stream = ytdl(song.url, { filter: "audioonly" });
    songQueue.connection
      .play(stream, { seek: 0, volume: 0.5 })
      .on("finish", () => {
        songQueue.songs.shift();
        videoPlayer(message, guild, songQueue.songs[0]);
      });
  } else {
    songQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  const embed = new Discord.MessageEmbed()
    .setAuthor("Now playing")
    .setTitle(`${song.title}`)
    .setColor("#1E5A9C")
    .setThumbnail(
      "https://cdn.discordapp.com/avatars/228252119956717570/a_5ff9dca8056d1e1210dff36f3f641c04.gif"
    )
    .setFooter(`Requested by ${message.author.username}`);
  await songQueue.textChannel.send(embed);
};

const skipSong = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You need to be in a channel to execute this command!"
    );
  if (!server_queue) {
    return message.channel.send(`There are no songs in queue.`);
  }
  server_queue.connection.dispatcher.end();
};

const stopSong = (message, server_queue) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You need to be in a channel to execute this command!"
    );
  server_queue.songs = [];
  server_queue.connection.dispatcher.end();
};
