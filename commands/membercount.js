const Discord = require("discord.js");

module.exports = {
  name: "membercount",
  description: "return the count of member",
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setTitle("**Infos**")
      .setColor("#1E5A9C")
      .setThumbnail(
        "https://cdn.discordapp.com/avatars/228252119956717570/a_5ff9dca8056d1e1210dff36f3f641c04.gif"
      )
      .setFooter(`Requested by ${message.author.username}`)
      .addFields(
        {
          name: "Server name :",
          value: `${message.guild.name}`,
        },
        {
          name: "Member count",
          value: `${message.guild.memberCount.toLocaleString()}`,
        },
        {
          name: "Users :",
          value: `${
            message.guild.members.cache.filter((member) => !member.user.bot)
              .size
          }`,
          inline: true,
        },
        {
          name: "Bots :",
          value: `${
            message.guild.members.cache.filter((member) => member.user.bot).size
          }`,
          inline: true,
        }
      );
    message.lineReply(embed);
  },
};
