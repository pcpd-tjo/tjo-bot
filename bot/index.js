/* eslint-disable no-undef */
require("dotenv").config;
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const expressServer = require("./server.js");
const initDatabase = require('./setupDatabase.js');
expressServer();

const { clientId } = require("./config.json");

const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

(async () => {
	client.db = initDatabase();
	const { cacheTitles } = require('./functions/titles.js')
	await cacheTitles(client);
	const { cacheCrystals } = require('./functions/crystals.js')
	await cacheCrystals(client);
})()


const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

client.commands = new Collection();
let commands = [];

const commandsPath = path.join(__dirname, 'new-commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		//console.log(command.data.name,command);
		client.commands.set(command.data.name, command);
		commands.push(command.data)
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const rest = new REST().setToken(token);
//const TEST_SERVER_ID = "986004377561088080";

(async () => {
	try {
		console.log(`Started refreshing x application (/) commands.`);
		commands = JSON.stringify(commands);
		commands = JSON.parse(commands)
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length || "0"} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

// Log in to Discord with your client's token
client.login(token);