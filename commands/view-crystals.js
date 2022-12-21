const {
	SlashCommandBuilder
} = require('@discordjs/builders');

const {
	getIdFromUsername
} = require("noblox.js");

const {
	MessageEmbed
} = require('discord.js');

let command = new SlashCommandBuilder();

module.exports = {
	data:
		command.setName('view-crystals')
			.setDescription('Lists what crystals a specific player owns')
			.addStringOption((option) =>
				option
					.setName('username')
					.setDescription('The username of the player whose crystals you want to view')
					.setRequired(true)
			),

	async execute(interaction, client) {
		const e = new MessageEmbed();
		let username = interaction.options.getString('username')
		let string = ""

		const loading_emoji = client.emojis.cache.find(emoji => emoji.name === "loading");
		e.setDescription(`Retrieving **${username}\'s** crystals ${loading_emoji}`)
		interaction.reply({
			embeds: [e]
		})

	async function fetch() {
		let db = client.db;
		let idOfUser = await getIdFromUsername(username);
		if (idOfUser) {
			const ref = db.ref(`/${idOfUser}`)
		ref.once('value').then(async (snapshot) => {
			let snap = snapshot.val();
			let arr = []
			arr.push(snap);
			//	console.log(arr);
			for (key in arr) {
			//	console.log(arr[key].crystals)
			//	console.log(arr[key].crystals.length)
				let parsed = JSON.parse(arr[key].crystals)
			//	console.log(parsed)
				for (let i in parsed) {
					//	console.log(parsed[i])
						string += "• " + parsed[i] + "\n"
					let originalLength = arr[key].crystals.length
					let originalLengthWithoutOne = originalLength - 1
					if (string != "" && string.length == originalLength || string.length == originalLengthWithoutOne) {
						e.setTitle(`Showing ${username}\'s crystals`);
						e.setDescription(string);
						e.setColor("GREEN");
						let count = 0
						count += 1
						if (count == 1) {
							await interaction.deleteReply()
						
							await interaction.followUp({
								embeds: [e]
							})
						}
						
					} else {
						console.log(string, string.length, parsed.length)
					}
				}
			}
			
		}), (errorObject) => {
			console.log('The read failed: ' + errorObject.name);
		}
		}
	}
		
fetch()
			
		
			











	}
}