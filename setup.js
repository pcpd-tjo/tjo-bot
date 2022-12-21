require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.static("public"));

const {
	Intents,
	Client
} = require('discord.js')

const client = new Client({
    allowedMentions: { parse: [] },
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_MEMBERS 
    ]
});
client.env = process.env;
app.get("/", async (req, res) => {
	await client.login(process.env.DISCORD_TOKEN);
	res.json({ status: "OK | 200", message: "TJO Bot Started" })
});

client.on("ready", async () => {
	console.log("Bot Started");
	
	const BotClient = require("./bot.js");
	BotClient(client);
	// should be a variable but not used?
});
var admin = require("firebase-admin");
let serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://titles-system-default-rtdb.firebaseio.com"
})

var db = admin.database();

client.db = db

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `There was an error while executing this command!: ${error}`, embeds: [], ephemeral: true })
		
	}
});



const listener = app.listen(process.env.PORT, () => {
	console.log("Your app is listening on port " + listener.address().port);
	console.log(listener.address());
});



module.exports = app