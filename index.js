require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.static("public"));

const { readdirSync } = require("node:fs");
const { join } = require("node:path");

const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const commands = [];
client.commands = new Collection();
const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

const rest = new REST({
  version: "9",
}).setToken(process.env["DISCORD_TOKEN"]);
const clientId = "986003476301635585";

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
    //await client.application.commands.set([]).then(() => console.log("Cleared GLOBAL commands"))
    client.guilds.cache.forEach(async (guild) => {
      await guild.commands.set([])
    })

    await rest.put(
      Routes.applicationCommands(clientId), {
      body: commands
    }
    ).then(() => console.log('Successfully reloaded application (/) commands.'))

  } catch (error) {
    console.error(error);
  }
})();

client.once(Events.ClientReady, () => {
  console.log(`${client.user.tag} is ready!`);
});

var admin = require("firebase-admin");
let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://titles-system-default-rtdb.firebaseio.com",
});

var db = admin.database();

client.db = db;

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

app.get("/", (req, res) => {
  if (res.statusCode == 200) {
    res.json({ message: "TJO BOT ONLINE", status: res.statusCode});
  } else {
    res
      .sendStatus(200)
  }
  
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
  console.log(listener.address());
});

client.login(process.env.DISCORD_TOKEN);
