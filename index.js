/* eslint-disable no-undef */
import { config } from 'dotenv';
import { Client, Events, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';

import expressServer from "./server.js";

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { clientId } from "./config.js";

// allows process.env to be used during runtime
config({ path: './.env' });

// starts the epxress server
expressServer();

const { TOKEN } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
let commands = [];


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	try {
		const {default: command} = await import(`./commands/${file}`)
		if (command.data) {
			client.commands.set(command.data.name, command);
			commands.push(command.data);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	} catch (error) {
		console.error(`Error loading command at ${filePath}:`, error);
	}
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

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

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

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

// Log in to Discord with your client's token
client.login(TOKEN);