/* eslint-disable no-undef */
const { SlashCommandBuilder } = require("@discordjs/builders");

const { getIdFromUsername } = require("noblox.js");

const { EmbedBuilder } = require("discord.js");

const { fetchCachedTitlesWithoutClient } = require('../functions/titles.js')

let command = new SlashCommandBuilder();
command.setName("view-titles")
command.setDescription("Lists what titles a specific player owns")
command.addStringOption((option) =>
	option
		.setName("username")
		.setDescription(
			"The username of the player whose titles you want to view"
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
		if (user_id) {
			const playerTitles = fetchCachedTitlesWithoutClient()[user_id] || [] //interaction.client.cachedTitles[user_id] || [];
			let description = "";
			if (playerTitles.length > 0) {
				for (let i = 0; i < playerTitles.length; i++) {
					description += `• ${playerTitles[i]}\n`;
				}
			}
			embed.setDescription(description.length > 0 ? description : `No Titles were found for ${username} (${user_id})`)
			embed.setColor("Green")
			await interaction.reply({
				embeds: [embed],
			});
		}
	}
};
