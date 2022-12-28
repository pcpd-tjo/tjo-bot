const { SlashCommandBuilder } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;

const { getIdFromUsername, getUsernameFromId } = require("noblox.js");

const { EmbedBuilder } = require("discord.js");

let command = new SlashCommandBuilder();

module.exports = {
	data: command
		.setName("view-titles")
		.setDescription("Lists what titles a specific player owns")
		.addStringOption((option) =>
			option
				.setName("username")
				.setDescription(
					"The username of the player whose titles you want to view"
				)
				.setRequired(true)
		),

	async execute(interaction, client) {
		const embed = new EmbedBuilder();
		let database = client.db;
		let string = "";
		let username = interaction.options.getString("username");
		await interaction.deferReply();
		const user_id = await getIdFromUsername(username);
		username = await getUsernameFromId(user_id);
		if (user_id) {
			const ref = database.ref(`players/${user_id}/ownedTitles/`);
			ref.once("value").then((snapshot) => {
				let snapshot_values = snapshot.val();
				//console.log(snapshot_values);
				if (snapshot_values) {
					for (value in snapshot_values) {
						//console.log(value);
						//console.log(snapshot_values[value]);
						let title = snapshot_values[value];
						string += `• ${title}\n`;
					}
					//console.log("LOOP THROUGH VALUES IS OVER")
				}
			}).then(async () => {
				await wait(4000)
				//console.log(string)
				embed.setTitle(`${username}\'s Titles `);
				embed.setDescription(string == "" ? `No Titles found for ${username}` : string);
				embed.setColor("Green")
				await interaction.editReply({
					embeds: [embed],
				});
			})
		}
	},
};
