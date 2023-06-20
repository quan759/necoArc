module.exports = {
  name: 'help',
  description: 'heres neco arc, whats your emergency?',
  type: 'CHAT_INPUT',
  run: async (client, interaction) => {
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
          name: '#ping',
          value: 'Check latency of the bot',
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
  },
};