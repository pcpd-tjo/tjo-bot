import { SlashCommandBuilder } from "@discordjs/builders";

import noblox from 'noblox.js';
const { getIdFromUsername, getUsernameFromId } = noblox;

import { EmbedBuilder } from "discord.js";

import { getPlayerCrystals } from '../controllers/crystals.controller.js';

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

const data = command;

const execute = async (interaction) => {
	const embed = new EmbedBuilder();
	let username = interaction.options.getString("username");
	const user_id = await getIdFromUsername(username);
	username = await getUsernameFromId(user_id);
	if (user_id) {
		const playerCrystals = await getPlayerCrystals(user_id)
		const isZeroLength = playerCrystals.length == 0;
		embed.setTitle(`${username}'s Crystals`)
		embed.setDescription(isZeroLength ? `No Crystals were found for ${username} (${user_id})` : `- ${playerCrystals.join("\n- ")}`);
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