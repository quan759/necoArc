const axios = require('axios');
const Database = require("@replit/database");
// const db = new Database();

module.exports = {
  name: 'chess',
  description: 'Shows the chess.com profile of a user',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'username',
      description: 'The chess.com username of the person you want to check the profile for',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const username = interaction.options.getString('username');
    const subcommand = interaction.options.getSubcommand();

    try {
    const response = await axios({
      method: 'get',
      url: `https://api.chess.com/pub/player/${username}/stats`,
    });
    const data = response.data;

    const response1 = await axios({
      method: 'get',
      url: `https://api.chess.com/pub/player/${username}`,
    });
    const data1 = response1.data;

    if (response.status === 404) {
      return interaction.reply(`Could not find a chess.com profile for user **${username}**.`);
    }

    const rapidElo = data.chess_rapid?.last?.rating ? data.chess_rapid.last.rating : 'Unknown';
    const blitzElo = data.chess_blitz?.last?.rating ? data.chess_blitz.last.rating : 'Unknown';
    const bulletElo = data.chess_bullet?.last?.rating ? data.chess_bullet.last.rating : 'Unknown';
    const name = data1.name || 'Unknown';
    const avatarUrl = data1.avatar || 'https://betacssjs.chesscomfiles.com/bundles/web/images/noavatar_l.1c5172d5.gif';

    const embed = {
      color: 0xF5DEB3,
      title: `Chess.com Profile for ${username}`,
      description: `\`\`\`\⏱️Rapid Elo: ${rapidElo}\n⚡Blitz Elo: ${blitzElo}\n🐇Bullet Elo: ${bulletElo}\n💬Name: ${name}\`\`\``,
      author: {
        name: 'Neco arc',
        icon_url: 'https://i.imgur.com/L0sBgsi.png',
      },
      thumbnail: {
        url: avatarUrl,
      },
      timestamp: new Date(),
      footer: {
        text: 'Neco arc',
        icon_url: 'https://i.imgur.com/L0sBgsi.png',
      },
    };

    interaction.reply({ embeds: [embed] });
  }
  catch (error) {
      console.error(error);
      return interaction.channel.send(`An error occurred while fetching the chess.com profile for user **${username}**.Or i can't find a chess.com profile for you :(`);
    }
  }
};
