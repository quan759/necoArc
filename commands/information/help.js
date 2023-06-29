module.exports = {
  name: 'help',
  
  description: 'Xem lệnh của bot',
  run: async (client, interaction, message, serverData, args) => {
    const helpEmbed = {
      color: 0xF5DEB3,
      title: 'Command List',
      fields: [
        {
          name: '#ask',
          value: 'Ask the bot a question',
        },
        {
          name: '#snipe',
          value: 'Get the most recently deleted message in the channel',
        },
        {
          name: '#kick',
          value: 'Kick a person',
        },
        {
          name: '#ban',
          value: 'Ban a person',
        },
        {
          name: '#say',
          value: 'Force the bot to say somethin',
        },
        {
          name: '#avatar',
          value: 'i think i dont have to explain this',
        },
        {
          name: '#prefix',
          value: 'Change current prefix',
        },
        {
          name: '#calc',
          value: 'school timeeeeeeeeeeeeeee baby',
        },
        {
          name: '#guess',
          value: 'Play a number guessing game with the bot',
        },
        {
          name: '#rps',
          value: 'rock, paper, scissors',
        },
        {
          name: '#chess',
          value: 'check profile of anyone on chess.com',
        },
        {
          name: '#lichess',
          value: 'check profile of anyone on lichess',
        },
        {
          name: '#imagine',
          value: 'imagine',
        },
        {
          name: '#link',
          value: 'link chess.com or lichess username to this bot',
        },
        {
          name: '#delete',
          value: 'delete mesages',
        },
        {
          name: '#roast',
          value: 'oh hell nah',
        },
        {
          name: '#snake',
          value: 'remember me?',
        },
        {
          name: '#tzfe',
          value: 'the 2048 game',
        },
        {
          name: '#trivia',
          value: 'true or false?',
        },
        {
          name: 'ChatCompletion',
          value: 'Send this to any channel to allow the bot to receive questions and send answers.',
        },
        {
          name: 'StopCompletion',
          value: 'Make the bot stop receiving and sending messages.',
        },
      ],
      timestamp: new Date(),
      footer: {
        text: 'Help is on the way',
        icon_url: 'https://i.imgur.com/L0sBgsi.png',
      },
    };
    await interaction.reply({ embeds: [helpEmbed] });
  }
};
