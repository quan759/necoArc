const { FastType } = require('discord-gamecord');
const fs = require('fs');
const rawData = fs.readFileSync('sentence.json');
const data = JSON.parse(rawData);

module.exports = {
  name: 'fasttype',
  description: 'ft',
  aliases: ['ft'],
  run: async (client, message, args) => {
    const randomIndex = Math.floor(Math.random() * data.sentences.length);
    const randomMessage = data.sentences[randomIndex];
    console.log(randomMessage);
    const Game = new FastType({
      message: message,
      isSlashGame: false,
      embed: {
        title: 'Fast Type',
        color: '0xF5DEB3',
        description: 'You have {time} seconds to type the sentence below.'
      },
      timeoutTime: 60000,
      sentence: `${randomMessage}`,
      winMessage: 'You won! You finished the type race in {time} seconds with wpm of {wpm}.',
      loseMessage: 'You lost! You didn\'t type the correct sentence in time.',
    });

    Game.startGame();
  }
};
