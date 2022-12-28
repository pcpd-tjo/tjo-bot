const {
  SlashCommandBuilder
} = require('@discordjs/builders');

const {
  MessageEmbed, CommandInteraction
} = require('discord.js');

let command = new SlashCommandBuilder();

module.exports = {
  data:
    command.setName('new-title')
      .setDescription('Allows a user to make a new title that any other user can get.')
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
          .setName('new-title')
          .setDescription('The name of the title that you want to make.')
          .setRequired(true)
      ),

  async execute(interaction, client) {
    interaction.reply(`Command not finished \nYour New Title is ${interaction.options.getString('new-title')} in the ${interaction.options.getString('category')} category`);
  }
}