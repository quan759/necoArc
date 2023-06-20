const { Trivia } = require('discord-gamecord');

module.exports = {
  name: 'trivia',
  description: 'trivia',
  run: async (client, message, args) => {
    const diff = args[0];
    const mode = args[1];
    const game = new Trivia({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Trivia',
        color: '0xF5DEB3',
        description: 'You have 60 seconds to guess the answer.'
      },
      timeoutTime: 60000,
      buttonStyle: 'PRIMARY',
      trueButtonStyle: 'SUCCESS',
      falseButtonStyle: 'DANGER',
      mode: mode || 'single',
      difficulty: diff || 'medium',
      winMessage: 'You won! The correct answer is {answer}.',
      loseMessage: 'You lost! The correct answer is {answer}.',
      errMessage: 'Unable to fetch question data! Please try again.',
      playerOnlyMessage: 'Only {player} can use these buttons.'
    });

    game.startGame();
  }
};
