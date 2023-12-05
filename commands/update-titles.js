/* eslint-disable no-undef */
const { SlashCommandBuilder } = require("@discordjs/builders");

const { EmbedBuilder } = require("discord.js");

let command = new SlashCommandBuilder();
command.setName("update-titles-cache")
command.setDescription("Fetches the titles from the database and caches them within the bot for quicker access")

module.exports = {
    data: command,
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const cacheTitles = interaction.client.cacheTitles;
        const cachedTitles = cacheTitles(interaction.client);
        if (cachedTitles == []) {
            embed.setDescription("An error occured whilst updating the cached titles, report this to UntoldGam")
            embed.setColor("Red")
        } else {
            embed.setDescription("The cached titles have been updated successfully")
            embed.setColor("Green")
        }

        await interaction.reply({
            embeds: [embed],
        });
    }
};
