const axios = require('axios');
const db = require('../../database');
module.exports = {
  name: 'lichess',
  description: 'Shows the Lichess profile of a user',
  run: async (client, message, args) => {
    let username;
    const linkedUsername = await db.get(`${message.author.id}_lichess`);

    if (!args.length) {
      if (!linkedUsername) {
        return message.channel.send(`You need to provide a lichess username, ${message.author}!`);
      }
      username = linkedUsername;
    } else {
      username = args[0];
    }

    try {
      const response = await axios({
        method: 'get',
        url: `https://lichess.org/api/user/${username}`,
      });
      const data = response.data;

      if (!data) {
        return message.channel.send(`Could not find a Lichess profile for user **${username}**.`);
      }

      const rapidElo = data.perfs?.rapid?.rating ? data.perfs.rapid.rating : 'Unknown';
      const blitzElo = data.perfs?.blitz?.rating ? data.perfs.blitz.rating : 'Unknown';
      const bulletElo = data.perfs?.bullet?.rating ? data.perfs.bullet.rating : 'Unknown';
      const name = data.username || 'Unknown';
      const avatarUrl = `https://lichess.org/api/avatar/${username}`;

      const embed = {
        color: '#0000FF',
        title: `Lichess Profile for ${username}`,
        description: `\`\`\`\⏱️Rapid Elo: ${rapidElo}\n⚡Blitz Elo: ${blitzElo}\n🐇Bullet Elo: ${bulletElo}\n💬Name: ${name}\`\`\``,
        author: {
          name: `${message.guild.me.displayName}`,
          icon_url: client.user.displayAvatarURL({ dynamic: true }),
        },
        thumbnail: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Lichess_Logo.svg/1200px-Lichess_Logo.svg.png',
        },
        timestamp: new Date(),
        footer: {
          text: `${message.guild.me.displayName}`,
          icon_url: client.user.displayAvatarURL({ dynamic: true }),
        },
      };

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.channel.send(`An error occurred while fetching the Lichess profile for user **${username}**. Or i can't find a Lichess profile for ${message.author} :(`);
    }
  }
};
