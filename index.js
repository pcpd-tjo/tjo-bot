/* eslint-disable no-undef */
import { config } from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';

import expressServer from "./server.js";


// allows process.env to be used during runtime
config({ path: './.env' });

// starts the epxress server
expressServer();

const { TOKEN } = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


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

client.login(TOKEN);