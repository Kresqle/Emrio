module.exports = {
  name: "say",
  description: "say something",
  execute(message, args) {
    message.channel.send(args.slice(0).join(" "));
    message.delete();
  },
};
