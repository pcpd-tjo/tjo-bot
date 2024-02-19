/* eslint-disable no-undef */
import { config } from 'dotenv';
import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';
import expressServer from "./server.js";
import { clientId } from './config.js'

// allows process.env to be used during runtime
config({ path: './.env' });

// starts the epxress server
expressServer();

const { TOKEN } = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


const rest = new REST({ version: '10' }).setToken(TOKEN);
const commands = (await rest.get(
	Routes.applicationCommands(clientId)
))

client.commands = commands;

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	const { default: command } = await import(`./commands/${interaction.commandName}.js`)
	
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
	}

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

client.login(TOKEN);