const {
	Collection
} = require(`discord.js`);

const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9');

const {
	readdirSync
} = require('node:fs');

module.exports = async (client) => {
	const commands = [];
	client.commands = new Collection();

	const commandFiles = readdirSync(require('path').join(__dirname, '.', 'commands'))
		.filter(file => file.endsWith('.js'));

	const clientId = "986003476301635585";

	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
		commands.push(command.data.toJSON());
	}

	const rest = new REST({
		version: '9'
	}).setToken(process.env['DISCORD_TOKEN']);

	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');
			// let guildId = "986004377561088080"
			await client.application.commands.set([]).then(() => console.log("Cleared GLOBAL commands"))
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



}


