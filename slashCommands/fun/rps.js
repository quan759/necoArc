const { MessageAttachment } = require('discord.js');
module.exports = {
  name: 'rps',
  description: 'Play rock-paper-scissors with the bot',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'choice',
      description: 'Choose rock, paper, or scissors',
      type: 'STRING',
      required: true,
      choices: [
        { name: 'Rock', value: 'rock' },
        { name: 'Paper', value: 'paper' },
        { name: 'Scissors', value: 'scissors' }
      ]
    }
  ],
  run: async (client, interaction) => {
    const choice = interaction.options.getString('choice').toLowerCase();
    const choices = ['rock', 'paper', 'scissors'];
    const botChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (!choices.includes(choice)) {
      return interaction.reply(`Please choose one of the following: ${choices.join(', ')}`);
    }

    if (choice === botChoice) {
      result = 'tie';
    } else if (choice === 'rock' && botChoice === 'scissors' ||
      choice === 'paper' && botChoice === 'rock' ||
      choice === 'scissors' && botChoice === 'paper') {
      result = 'win';
    } else {
      result = 'lose';
    }

    const attachment = new MessageAttachment('https://media.discordapp.net/attachments/1079614179914293358/1083762961421713449/A7D3D23A-B43F-480C-9648-664357DB25E5.gif');
    await interaction.reply({ content: 'You chose ' + choice + ', and I chose ' + botChoice + '. You ' + result + '!', files: [attachment] });
  },
};
