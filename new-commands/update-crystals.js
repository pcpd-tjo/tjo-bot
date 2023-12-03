/* eslint-disable no-undef */
const { SlashCommandBuilder } = require("@discordjs/builders");

const { EmbedBuilder } = require("discord.js");

let command = new SlashCommandBuilder();
command.setName("update-crystals-cache")
command.setDescription("Fetches the crystals from the database and caches them within the bot for quicker access")

module.exports = {
    data: command,
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const cacheCrystals = interaction.client.cacheCrystals;
        const cachedCrystals = cacheCrystals(interaction.client);
        if (cachedCrystals == []) {
            embed.setDescription("An error occured whilst updating the cached crystals, report this to UntoldGam")
            embed.setColor("Red")
        } else {
            embed.setDescription("The cached crystals have been updated successfully")
            embed.setColor("Green")
        }

        await interaction.reply({
            embeds: [embed],
        });
    }
};
