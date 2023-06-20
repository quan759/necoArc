const { Hangman } = require('discord-gamecord');

module.exports = {
  name: 'hangman',
  description: 'hangman',
  run: async (client, message, args) => {
    const Game = new Hangman({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Hangman',
        color: '0xF5DEB3'
      },
      hangman: { hat: '🎩', head: '😟', shirt: '👕', pants: '🩳', boots: '👞👞' },
      customWord: 'Gamecord',
      timeoutTime: 60000,
      theme: 'nature',
      winMessage: 'You won! The word was **{word}**.',
      loseMessage: 'You lost! The word was **{word}**.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    Game.startGame();
  }
};