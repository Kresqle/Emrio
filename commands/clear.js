module.exports = {
  name: "clear",
  description: "clear messages",
  execute(message, args) {
    if (message.member.hasPermission("MANAGE_MEMBERS")) {
      if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        message.lineReply("Please specify a number of messages to clear.");
      } else if (parseInt(args[0]) > 100) {
        message.lineReply("You can only delete 100 messages at a time.");
      } else {
        let deleteAmount = parseInt(args[0]);
        message.channel.bulkDelete(deleteAmount, true);
        message.channel.send(`Successfully deleted ${deleteAmount} messages.`);
      }
    } else {
      message.lineReply("You do not have permission to manage messages.");
    }
  },
};
