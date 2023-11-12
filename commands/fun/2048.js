const { TwoZeroFourEight } = require('discord-gamecord');

module.exports = {
  name: 'tzfe',
  description: 'tzfe',
  run: async (client, message, args) => {
    const game = new TwoZeroFourEight({
      message: message,
      isSlashGame: false,
      embed: {
        title: '2048',
        color: '#0000FF'
      },
      emojis: {
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    game.startGame();
  }
};
