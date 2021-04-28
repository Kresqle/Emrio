// Declare consts
const fs = require("fs");
const Discord = require("discord.js");
require("discord-reply");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");
const { forbiddenWords } = require("./forbiddenWords.json");

// setups the commands
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// message event
client.on("message", (message) => {
  // verifies if the message is sent by a user
  if (message.author.bot) return;

  // delete a message if it contains a forbidden word
  forbiddenWords.forEach((word) => {
    if (message.content.toLowerCase() === word) {
      message.delete();
      message.channel.send(
        "**" + message.author.username + "**, please don't say that !"
      );
    }
  });

  // verifies if the message start with the prefix
  if (!message.content.startsWith(prefix)) return;

  // split the message to get the command
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // verifies if the command exists
  if (!client.commands.has(command)) return;

  // tries to run the command
  try {
    client.commands.get(command).execute(message, args);
  } catch (e) {
    console.error(e);
    message.lineReply("An error has occured.");
  }
});

// logs the bot
client.login(token);

// sets the status
client.on("ready", () => {
  console.log("Connected as " + client.user.tag);
  client.user.setActivity("you", { status: "online", type: "WATCHING" });
});
