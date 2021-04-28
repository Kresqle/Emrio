module.exports = {
  name: "forbiddenwordslist",
  description: "Returns the list of every forbidden words",
  execute(message) {
    const { forbiddenWords } = require("../forbiddenWords.json");
    var list = "";
    forbiddenWords.forEach((word) => {
      list = list.concat("\n- " + word);
    });
    message.channel.send(
      "Here is the list of forbidden words, **" +
        message.author.username +
        "**" +
        list
    );
  },
};
