const parseDuration = require("parse-duration");
const humanizeDuration = require("humanize-duration");

module.exports = {
  name: "tempban",
  description: "Tempban member",
  execute(message, args) {
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.member.hasPermission("BAN_MEMBERS")
    ) {
      const target = message.mentions.users.first();
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        if (targetMember.bannable) {
          const time = parseDuration(args[1]);
          if (time) {
            const reason = args.slice(2).join(" ");
            targetMember.send(
              `You've been banned from ${
                message.guild.name
              } during ${humanizeDuration(time, { language: "en" })} by ${
                message.author.username
              } for the following reason : "${reason}"`
            );
            targetMember.ban();
            message.lineReply(
              `${target.username} has been banned for "${reason}" by ${
                message.author.username
              } during ${humanizeDuration(time, { language: "en" })}.`
            );
            setTimeout(() => {
              message.guild.members.unban(targetMember);
              message.lineReply(`${target.username} has been unbanned.`);
            }, time);
          } else {
            message.lineReply("Please specify the duration of the ban");
          }
        } else {
          message.lineReply(
            `I do not have permission to ban ${target.username}.`
          );
        }
      } else {
        message.lineReply("Please specify someone to ban.");
      }
    } else {
      message.lineReply("You do not have permission to ban members.");
    }
  },
};
