const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const {
  MessageEmbed, CommandInteraction
} = require('discord.js');

let command = new SlashCommandBuilder();

module.exports = {
  data:
    command.setName('delete-title')
      .setDescription('Allows a user to delete an existing title.')
      .addStringOption((option) =>
        option
          .setName('category')
          .setDescription('What category you want the new title to be a part of')
          .setRequired(true)
          .addChoices(
            { name: 'Jedi Artisans', value: 'Jedi Artisans' },
            { name: 'Consulars', value: 'Consulars' },
          )
      )
      .addStringOption((option) =>
        option
          .setName('title')
          .setDescription('The name of the title that you want to delete.')
          .setRequired(true)
      ),

  async execute(interaction, client) {
    interaction.reply(`Command not finished \nThe title, ${interaction.options.getString('title')}, was deleted from the ${interaction.options.getString('category')} category`);
  }
}