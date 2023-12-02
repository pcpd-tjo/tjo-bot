/* eslint-disable no-undef */
//const { ApplicationCommand } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
//const { fetch } = require("../functions/titles");
const command = new SlashCommandBuilder();
command.setName("get-titles")
command.setDescription("Retrieve all the titles within a specific category")

const { fetchCachedTitlesWithoutClient } = require('../functions/titles');
let titles = {};
const getTitles = async () => {
  titles = await fetchCachedTitlesWithoutClient();
}
getTitles();
command.addStringOption(option => {
  option.setName("category")
  option.setDescription("The category of the tile you wish to see")
  option.addChoices(
    ...
    Object
      .keys(titles)
      .map(choice => ({
        name: choice,
        value: choice,
      }))
  )
  option.setRequired(true)
  return option
})


// eslint-disable-next-line no-undef
module.exports = {
  data: command,
  async execute(interaction) {
    const category = interaction.options.getString('category');
    const categoryTitles = titles[category];
    await interaction.reply(`All titles from the ${category} category are: \n- ${categoryTitles.join("\n- ")}`);
  }
};
