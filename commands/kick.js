module.exports = {
  name: "kick",
  description: "kick member",
  execute(message, args) {
    if (
      message.member.hasPermission("ADMINISTRATOR") ||
      message.member.hasPermission("KICK_MEMBERS")
    ) {
      const target = message.mentions.users.first();
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id);
        if (targetMember.kickable) {
          const reason = args.slice(2).join(" ");
          targetMember.send(
            `You've been kicked from ${message.guild.name} by ${message.author.username} for the following reason : "${reason}"`
          );
          targetMember.kick();
          message.lineReply(
            `${target.username} has been kicked for "${reason}" by ${message.author.username}.`
          );
        } else {
          message.lineReply(
            `I do not have permission to kick ${target.username}.`
          );
        }
      } else {
        message.lineReply("Please specify someone to kick.");
      }
    } else {
      message.lineReply("You do not have permission to kick members.");
    }
  },
};
