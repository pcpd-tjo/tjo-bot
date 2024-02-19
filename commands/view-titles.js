import { SlashCommandBuilder } from "@discordjs/builders";

import noblox from 'noblox.js';
const { getIdFromUsername, getUsernameFromId } = noblox;

import { EmbedBuilder } from "discord.js";

import { getPlayerTitles } from '../controllers/titles.controller.js';

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

const data = command;

const execute = async (interaction) => {
	const embed = new EmbedBuilder();
	let username = interaction.options.getString("username");
	const user_id = await getIdFromUsername(username);
	username = await getUsernameFromId(user_id);
	if (user_id) {
		const playerTitles = await getPlayerTitles(user_id);
		const isZeroLength = playerTitles.length == 0;
		embed.setTitle(`${username}'s Titles`)
		embed.setDescription(isZeroLength ? `No Titles were found for ${username} (${user_id})` : `- ${playerTitles.join("\n- ")}`);
		embed.setColor(isZeroLength ? 'Red' : 'Green');
		await interaction.reply({
			embeds: [embed],
		});
	}
}
export default {
	data,
	execute
}