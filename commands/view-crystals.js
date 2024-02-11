/* eslint-disable no-undef */
const { SlashCommandBuilder } = require("@discordjs/builders");

const { getIdFromUsername, getUsernameFromId } = require("noblox.js");

const { EmbedBuilder } = require("discord.js");

let command = new SlashCommandBuilder();
command.setName("view-crystals")
command.setDescription("Lists what crystals a specific player owns")
command.addStringOption((option) =>
	option
		.setName("username")
		.setDescription(
			"The username of the player whose crystals you want to view"
		)
		.setRequired(true)
)

module.exports = {
	data: command,
	async execute(interaction) {
		const embed = new EmbedBuilder();
		let username = interaction.options.getString("username");
		//await interaction.deferReply();
		const user_id = await getIdFromUsername(username);
		username = await getUsernameFromId(user_id);
		if (user_id) {
			const playerCrystals = interaction.client.cachedCrystals[user_id] || [];
			console.log(playerCrystals);
			//embed.setTitle(`${username}'s Crystals `);
			embed.setDescription(playerCrystals.length > 0 ? playerCrystals.join("\n") : `No Crystals were found for ${username} (${user_id})`);
			embed.setColor("Green")
			await interaction.reply({
				embeds: [embed],
			});
		}
	},
};
