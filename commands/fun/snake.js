const { Snake } = require('discord-gamecord');

module.exports = {
  name: 'snake',
  description: 'snake',
  run: async (client, message, args) => {
    const snakeGame = new Snake({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Snake Game',
        overTitle: 'Game Over',
        color: '0xF5DEB3',
      },
      emojis: {
        board: '⬛',
        food: '🍎',
        up: '⬆️',
        down: '⬇️',
        left: '⬅️',
        right: '➡️',
      },
      stopButton: 'Stop',
      timeoutTime: 60000,
      snake: { head: '🟢', body: '🟩', tail: '🟢', over: '💀' },
      foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    snakeGame.startGame();
  }
};
