const axios = require('axios');

module.exports = {
  name: 'lichess',
  description: 'Shows the Lichess profile of a user',
  options: [
    {
      name: 'username',
      description: 'The username of the Lichess profile to look up',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const username = interaction.options.getString('username');

    try {
      const response = await axios({
        method: 'get',
        url: `https://lichess.org/api/user/${username}`,
      });
      const data = response.data;

      if (!data) {
        return interaction.reply(`Could not find a Lichess profile for user **${username}**.`);
      }

      const rapidElo = data.perfs?.rapid?.rating ? data.perfs.rapid.rating : 'Unknown';
      const blitzElo = data.perfs?.blitz?.rating ? data.perfs.blitz.rating : 'Unknown';
      const bulletElo = data.perfs?.bullet?.rating ? data.perfs.bullet.rating : 'Unknown';
      const name = data.username || 'Unknown';
      const avatarUrl = `https://lichess.org/api/avatar/${username}`;

      const embed = {
        color: 0xF5DEB3,
        title: `Lichess Profile for ${username}`,
        description: `\`\`\`\⏱️Rapid Elo: ${rapidElo}\n⚡Blitz Elo: ${blitzElo}\n🐇Bullet Elo: ${bulletElo}\n💬Name: ${name}\`\`\``,
        author: {
          name: 'Neco arc',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
        thumbnail: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Lichess_Logo.svg/1200px-Lichess_Logo.svg.png',
        },
        timestamp: new Date(),
        footer: {
          text: 'Neco arc',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
      };

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply(`An error occurred while fetching the Lichess profile for user **${username}**. Or i can't find a Lichess profile for ${interaction.user} :(`);
    }
  }
};
