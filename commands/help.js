const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "return the help page",
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle("**Help page**")
      .setColor("#1E5A9C")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/228252119956717570/a_5ff9dca8056d1e1210dff36f3f641c04.gif"
      )
      .setFooter(`Requested by ${message.author.username}`);

    if (!args[0]) {
      embed.addFields(
        {
          name: "Whats is the bot used for ?",
          value: "It can do multiple things like :",
        },
        {
          name: "Moderation",
          value: "Help your moderators",
          inline: true,
        },
        {
          name: "Music",
          value: "Listen music on Discord",
          inline: true,
        },
        {
          name: "Infos",
          value: "Get different infos about Discord",
          inline: true,
        },
        {
          name: "Miscellaneous",
          value: "Just some funny commands",
          inline: true,
        },
        {
          name: "Modules",
          value:
            "Type `e!help <module>` to get more infos about a specific module",
        }
      );
    } else {
      switch (args[0]) {
        case "moderation":
          if (!args[1]) {
            embed.addFields(
              {
                name: "Moderation module",
                value: "Help your moderators",
              },
              {
                name: "Using :",
                value: "Ban, tempban, kick, mute and much more",
              },
              {
                name: "Commands",
                value: "`ban`, `tempban`, `kick`, `clear`",
              },
              {
                name: "Usage",
                value:
                  "Type `e!help moderation <command>` to get more infos about this command",
              }
            );
          } else {
            switch (args[1]) {
              case "ban":
                embed.addFields(
                  {
                    name: "Ban",
                    value:
                      "You must have permission to ban users to use this command",
                  },
                  {
                    name: "Using",
                    value: "Ban a user for a specific reason",
                    inline: true,
                  },
                  {
                    name: "Syntax",
                    value: "`e!ban <user> <reason>`",
                    inline: true,
                  }
                );
                break;
              case "tempban":
                embed.addFields(
                  {
                    name: "Tempban",
                    value:
                      "You must have permission to ban users to use this command",
                  },
                  {
                    name: "Using",
                    value:
                      "Tempban a user during a specific time for a specific reason.",
                    inline: true,
                  },
                  {
                    name: "Syntax",
                    value: "`e!tempban <user> <time> <reason>`",
                    inline: true,
                  }
                );
                break;
              case "kick":
                embed.addFields(
                  {
                    name: "Kick",
                    value:
                      "You must have permission to kick users to use this command",
                  },
                  {
                    name: "Using",
                    value: "Kick a user for a specific reason.",
                    inline: true,
                  },
                  {
                    name: "Syntax",
                    value: "`e!kick <user> <reason>`",
                    inline: true,
                  }
                );
                break;
              case "clear":
                embed.addFields(
                  {
                    name: "Clear",
                    value:
                      "You must have permission to manage messages to use this command",
                  },
                  {
                    name: "Using",
                    value: "Clear a specific number of messages",
                    inline: true,
                  },
                  {
                    name: "Syntax",
                    value: "`e!clear <number>`",
                    inline: true,
                  }
                );
                break;
              default:
                embed.addFields({
                  name: "Warning",
                  value: "The syntax is incorrect",
                });
                break;
            }
          }
          break;
        case "music":
          if (!args[1]) {
            embed.addFields(
              {
                name: "Music module",
                value: "Listen music on Discord",
              },
              {
                name: "Using :",
                value: "Make the bot playing songs",
              },
              {
                name: "Commands",
                value: "`music`",
              },
              {
                name: "Usage",
                value:
                  "Type `e!help music <command>` to get more infos about this command",
              }
            );
          } else {
            switch (args[1]) {
              case "music":
                if (!args[2]) {
                  embed.addFields(
                    {
                      name: "Music",
                      value:
                        "You need to be in a voice channel to use this command",
                    },
                    {
                      name: "Using",
                      value: "One command to rule them all",
                      inline: true,
                    },
                    {
                      name: "Syntax",
                      value: "`e!music <action>`",
                      inline: true,
                    },
                    {
                      name: "_ _",
                      value: "_ _ ",
                    },
                    {
                      name: "Why only one command ?",
                      value:
                        "With the way the bot is coded, it's much easier to just use one command",
                      inline: true,
                    },
                    {
                      name: "`<action>` can be :",
                      value: "`play`, `skip` or `stop`",
                      inline: true,
                    }
                  );
                } else {
                  switch (args[2]) {
                    case "play":
                      embed.addFields(
                        {
                          name: "Music play",
                          value:
                            "You have to be in a voice channel to use this command",
                        },
                        {
                          name: "Using",
                          value: "Make the bot playing a song",
                          inline: true,
                        },
                        {
                          name: "Syntax",
                          value: "`e!music play <song>`",
                          inline: true,
                        }
                      );
                      break;
                    case "skip":
                      embed.addFields(
                        {
                          name: "Music skip",
                          value:
                            "You have to be in a voice channel to use this command",
                        },
                        {
                          name: "Using",
                          value: "Skip the song the bot is currently playing",
                          inline: true,
                        },
                        {
                          name: "Syntax",
                          value: "`e!music skip`",
                          inline: true,
                        }
                      );
                      break;
                    case "stop":
                      embed.addFields(
                        {
                          name: "Music stop",
                          value:
                            "You have to be in a voice channel to use this command",
                        },
                        {
                          name: "Using",
                          value: "Make the bot stop playing songs",
                          inline: true,
                        },
                        {
                          name: "Syntax",
                          value: "`e!music stop`",
                          inline: true,
                        }
                      );
                      break;
                    default:
                      embed.addFields({
                        name: "Warning",
                        value: "The syntax is incorrect",
                      });
                      break;
                  }
                }
                break;
              default:
                embed.addFields({
                  name: "Warning",
                  value: "The syntax is incorrect",
                });
                break;
            }
          }
          break;
        case "infos":
          if (!args[1]) {
            embed.addFields(
              {
                name: "Infos module",
                value: "Get infos about Discord",
              },
              {
                name: "Using :",
                value: "Ask the bot about some infos",
              },
              {
                name: "Commands",
                value: "`membercount`",
              },
              {
                name: "Usage",
                value:
                  "Type `e!help infos <command>` to get more infos about this command",
              }
            );
          } else {
            switch (args[1]) {
              case "membercount":
                embed.addFields(
                  {
                    name: "Member count",
                    value:
                      "You don't need any specific permission to use this command",
                  },
                  {
                    name: "Using",
                    value: "Ask the bot how many members are on the server",
                    inline: true,
                  },
                  {
                    name: "Syntax",
                    value: "`e!membercount`",
                    inline: true,
                  }
                );
                break;
              default:
                embed.addFields({
                  name: "Warning",
                  value: "The syntax is incorrect",
                });
                break;
            }
          }
          break;
        case "miscellaneous":
          if (!args[1]) {
            embed.addFields(
              {
                name: "Miscellaneous module",
                value: "Just some funny commands",
              },
              {
                name: "Using :",
                value: "Have some fun with the bot",
              },
              {
                name: "Commands",
                value: "`say`",
              },
              {
                name: "Usage",
                value:
                  "Type `e!help miscellaneous <command>` to get more infos about this command",
              }
            );
          } else {
            switch (args[1]) {
              case "say":
                embed.addFields(
                  {
                    name: "Say",
                    value:
                      "You don't need any specific permission to use this command",
                  },
                  {
                    name: "Using",
                    value: "Make the bot saying something",
                    inline: true,
                  },
                  {
                    name: "Syntax",
                    value: "`e!say <message>`",
                    inline: true,
                  }
                );
                break;
              default:
                embed.addFields({
                  name: "Warning",
                  value: "The syntax is incorrect",
                });
                break;
            }
          }
          break;
        default:
          embed.addFields({
            name: "Warning",
            value: "The syntax is incorrect",
          });
          break;
      }
    }

    message.lineReply(embed);
  },
};
