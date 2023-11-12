const axios = require('axios');
const rdb = require('../../database');

module.exports = {
  name: 'chess',
  description: 'Hiển thị hồ sơ chess.com của một người dùng',
  run: async (client, message, args) => {
    try {
      if (message.mentions.members.first() && typeof message.mentions.members.first() !== "undefined") {
        const user = message.mentions.members.first();
        const link = await rdb.get(`${user.id}_chess.com`);
        if (!link) {
          return message.channel.send(`User ${user} has not linked yet.`);
        }
        const response = await axios({
          method: 'get',
          url: `https://api.chess.com/pub/player/${link}/stats`,
        });
        const data = response.data;

        const response1 = await axios({
          method: 'get',
          url: `https://api.chess.com/pub/player/${link}`,
        });
        const data1 = response1.data;

        if (!data || !data1) {
          return message.channel.send(`Could not find a chess.com profile for user **${link}**.`);
        }

        const rapidElo = data.chess_rapid?.last?.rating || 'Unknown';
        const blitzElo = data.chess_blitz?.last?.rating || 'Unknown';
        const bulletElo = data.chess_bullet?.last?.rating || 'Unknown';
        const bestRapid = data.chess_rapid?.best?.rating || 'Unknown';
        const bestBlitz = data.chess_blitz?.best?.rating || 'Unknown';
        const bestBullet = data.chess_bullet?.best?.rating || 'Unknown';
        const winR = data.chess_rapid?.record?.win || '0';
        const drawR = data.chess_rapid?.record?.draw || '0';
        const lossR = data.chess_rapid?.record?.loss || '0';
        const winB = data.chess_blitz?.record?.win || '0';
        const drawB = data.chess_blitz?.record?.draw || '0';
        const lossB = data.chess_blitz?.record?.loss || '0';
        const winA = data.chess_bullet?.record?.win || '0';
        const drawA = data.chess_bullet?.record?.draw || '0';
        const lossA = data.chess_bullet?.record?.loss || '0';
        const name = data1.name || 'Unknown';
        const avatarUrl = data1.avatar || 'https://betacssjs.chesscomfiles.com/bundles/web/images/noavatar_l.1c5172d5.gif';

        const embed = {
          color: '#0000FF',
          title: `Chess.com Profile for ${link}`,
          description: `\`\`\`\💬Name: ${name}\n-----------------------------\n⏱️Rapid Elo: ${rapidElo}\n🔥Best: ${bestRapid}\n🔍W|D|L: ${winR} | ${drawR} | ${lossR}\n-----------------------------\n⚡Blitz Elo: ${blitzElo}\n🔥Best: ${bestBlitz}\n🔍W|D|L: ${winB} | ${drawB} | ${lossB}\n-----------------------------\n🐇Bullet Elo: ${bulletElo}\n🔥Best: ${bestBullet}\n🔍W|D|L: ${winA} | ${drawA} | ${lossA}\`\`\``,
          author: {
            name: `${message.guild.me.displayName}`,
            icon_url: client.user.displayAvatarURL({ dynamic: true }),
          },
          thumbnail: {
            url: avatarUrl,
          },
          timestamp: new Date(),
          footer: {
            text: `${message.guild.me.displayName}`,
            icon_url: client.user.displayAvatarURL({ dynamic: true }),
          },
        };

        return message.channel.send({ embeds: [embed] });
      }

      let username;
      const linkedUsername = await rdb.get(`${message.author.id}_chess.com`);

      if (!args.length) {
        if (!linkedUsername) {
          return message.channel.send(`You need to provide a chess.com username, ${message.author}!`);
        }
        username = linkedUsername;
      } else {
        username = args[0];
      }

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

      if (!data || !data1) {
        return message.channel.send(`Could not find a chess.com profile for user **${username}**.`);
      }

      const rapidElo = data.chess_rapid?.last?.rating || 'Unknown';
      const blitzElo = data.chess_blitz?.last?.rating || 'Unknown';
      const bulletElo = data.chess_bullet?.last?.rating || 'Unknown';
      const bestRapid = data.chess_rapid?.best?.rating || 'Unknown';
      const bestBlitz = data.chess_blitz?.best?.rating || 'Unknown';
      const bestBullet = data.chess_bullet?.best?.rating || 'Unknown';
      const winR = data.chess_rapid?.record?.win || '0';
      const drawR = data.chess_rapid?.record?.draw || '0';
      const lossR = data.chess_rapid?.record?.loss || '0';
      const winB = data.chess_blitz?.record?.win || '0';
      const drawB = data.chess_blitz?.record?.draw || '0';
      const lossB = data.chess_blitz?.record?.loss || '0';
      const winA = data.chess_bullet?.record?.win || '0';
      const drawA = data.chess_bullet?.record?.draw || '0';
      const lossA = data.chess_bullet?.record?.loss || '0';
      const name = data1.name || 'Unknown';
      const avatarUrl = data1.avatar || 'https://betacssjs.chesscomfiles.com/bundles/web/images/noavatar_l.1c5172d5.gif';

      const embed = {
        color: '#0000FF',
        title: `Chess.com Profile for ${username}`,
        description: `\`\`\`\💬Name: ${name}\n-----------------------------\n⏱️Rapid Elo: ${rapidElo}\n🔥Best: ${bestRapid}\n🔍W|D|L: ${winR} | ${drawR} | ${lossR}\n-----------------------------\n⚡Blitz Elo: ${blitzElo}\n🔥Best: ${bestBlitz}\n🔍W|D|L: ${winB} | ${drawB} | ${lossB}\n-----------------------------\n🐇Bullet Elo: ${bulletElo}\n🔥Best: ${bestBullet}\n🔍W|D|L: ${winA} | ${drawA} | ${lossA}\`\`\``,
        author: {
          name: `${message.guild.me.displayName}`,
          icon_url: client.user.displayAvatarURL({ dynamic: true }),
        },
        thumbnail: {
          url: avatarUrl,
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
      return message.channel.send(`An error occurred while fetching the chess.com profile for user **${username}**. Or I can't find a chess.com profile for ${message.author} :(`);
    }
  }
};
