require('dotenv').config();
const rdb = require('../../database');

module.exports = {
  name: 'link',
  category: 'fun',
  description: 'Link your username for chess platforms',
  run: async (client, message, args) => {
    if (args.length < 2) {
      return message.channel.send(`You need to provide the platform and username in the format: \`#link <platform> <username>\`, ${message.author}!`);
    }

    const platform = args[0];
    const username = args[1];

    if (platform.toLowerCase() !== 'chess.com' && platform.toLowerCase() !== 'lichess') {
      return message.channel.send(`Invalid platform. Supported platforms are \`chess.com\` and \`lichess\`.`);
    }

    try {
      await rdb.set(`${message.author.id}_${platform}`, username);

      message.channel.send(`Successfully linked your ${platform} username as **${username}**.`);
    } catch (error) {
      console.error(error);
      return message.channel.send(`An error occurred while linking your username. Please try again later.`);
    }
  },
};