module.exports = {
  name: 'rps',
  description: 'Play rock-paper-scissors with the bot',
  run: async (client, message, args) => {
    const choices = ['rock', 'paper', 'scissors'];
    const choice = args[0]?.toLowerCase();

    if (!choice || !choices.includes(choice)) {
      return message.reply(`<:quan:951865158504955955> Please choose one of the following: ${choices.join(', ')}`);
    }

    const botChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    if (choice === botChoice) {
      result = 'tie';
    } else if (choice === 'rock' && botChoice === 'scissors' ||
      choice === 'paper' && botChoice === 'rock' ||
      choice === 'scissors' && botChoice === 'paper') {
      result = 'win';
    } else {
      result = 'lose';
    }

    message.reply(`You chose ${choice}, and I chose ${botChoice}. You ${result}!`);
    message.channel.send("https://media.discordapp.net/attachments/1079614179914293358/1083762961421713449/A7D3D23A-B43F-480C-9648-664357DB25E5.gif");
  },
};
