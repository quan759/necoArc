const axios = require('axios');
const Database = require("@replit/database");
const df = new Database();

module.exports = {
  name: 'guess',
  description: 'Play a number guessing game with the bot',
  run: async (client, message, args) => {
    if (!args.length) {
      return message.reply('Please provide mode');
    }
    if (args[0] === 'top') {
      const topPlayers = await getTopGuessWinners();
      if (topPlayers.length === 0) {
        return message.channel.send('There are no top players at the moment.');
      }

      const embed = {
        color: '#0000FF',
        title: 'Top Guess Game Winners',
        description: '```' + topPlayers.map((player, index) => `${index + 1}. ${getPlayerDisplayName(message.guild, player.userId)} - Score: ${player.score}`).join('\n') + '```',
        author: {
          name: `${message.guild.me.displayName}`,
          icon_url: client.user.displayAvatarURL({ dynamic: true }),
        },
        timestamp: new Date(),
        footer: {
          text: `${message.guild.me.displayName}`,
          icon_url: client.user.displayAvatarURL({ dynamic: true }),
        },
      };

      return message.channel.send({ embeds: [embed] });
    }
    else if (args[0] == 'normal') {
      const number = Math.floor(Math.random() * 100) + 1;

      console.log(number);
      let attempts = 5;
      let limit = 5;
      let check = 0;

      await message.channel.send('I am thinking of a number between 1 and 100. You have 5 attempts and 30 seconds to guess it. <:emoji_40:1113073468125229166>');

      const filter = m => !isNaN(m.content) && m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector({ filter, max: attempts, time: 30000 });

      collector.on('collect', async m => {
        const guess = parseInt(m.content);
        if (collector.collected.size !== 5) {
          if (guess === number) {
            check = 1;
            collector.stop();
            const score = (5 - attempts - collector.collected.size) * -1;
            const wins = await df.get(`guess_wins_${message.author.id}`);
            await df.set(`guess_wins_${message.author.id}`, (wins || 0) + 1);
            return message.reply(`<:teemo_wow:976865567204048947> 🎉 Congratulations! You guessed the number in ${score} attempts.`);
          } else if (guess > number) {
            message.reply(`The number is lower than your guess. You have ${attempts - collector.collected.size} attempts left <:teemo_like:971798105169215529>`);
          } else {
            message.reply(`The number is higher than your guess. You have ${attempts - collector.collected.size} attempts left <:tkquannentusat:1056055687253348392>`);
          }
        } else {
          if (guess !== number) {
            const wins = df.get(`guess_wins_${message.author.id}`);
            df.set(`guess_wins_${message.author.id}`, wins - 1);
            return message.reply(`<:connguyenbeohutthuoc:1030508919887515749> Game over. You ran out of attempts or time. The number was ${number}`);
          } else {
            message.reply(`<:teemo_wow:976865567204048947> 🎉 Congratulations! You guessed the number in 5 attempts.`);
          }
          collector.stop();
        }
      });

      collector.on('end', collected => {
        if (check == 0) {
          message.reply(`<:connguyenbeohutthuoc:1030508919887515749> Game over. You ran out of time. The number was ${number}`)
          const wins = df.get(`guess_wins_${message.author.id}`);
          df.set(`guess_wins_${message.author.id}`, (wins || 0) - 1);
        }
        console.log(collector.collected.size);
      });
    }
    else if (args[0] == 'hard') {
      const number = Math.floor(Math.random() * 100000) + 1;

      console.log(number);
      let attempts = 10;
      let limit = 10;
      let check = 0;

      await message.channel.send('I am thinking of a number between 1 and 100000. You have 10 attempts and 45 seconds to guess it. <:emoji_40:1113073468125229166>');

      const filter = m => !isNaN(m.content) && m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector({ filter, max: attempts, time: 45000 });

      collector.on('collect', async m => {
        const guess = parseInt(m.content);
        if (collector.collected.size !== 10) {
          if (guess === number) {
            check = 1;
            collector.stop();
            const score = (10 - attempts - collector.collected.size) * -1;
            message.reply(`<:teemo_wow:976865567204048947> 🎉 Congratulations! You guessed the number in ${score} attempts.`);

            const wins = await df.get(`guess_wins_${message.author.id}`);
            await df.set(`guess_wins_${message.author.id}`, (wins || 0) + 5);

            return;
          } else if (guess > number) {
            message.reply(`The number is lower than your guess. You have ${attempts - collector.collected.size} attempts left <:teemo_like:971798105169215529>`);
          } else {
            message.reply(`The number is higher than your guess. You have ${attempts - collector.collected.size} attempts left <:tkquannentusat:1056055687253348392>`);
          }
        } else {
          if (guess !== number) {

            const wins = await df.get(`guess_wins_${message.author.id}`);
            await df.set(`guess_wins_${message.author.id}`, (wins || 0) - 3);
            return message.reply(`<:connguyenbeohutthuoc:1030508919887515749> Game over. You ran out of attempts or time. The number was ${number}`);
          } else {
            message.reply(`<:teemo_wow:976865567204048947> 🎉 Congratulations! You guessed the number in 10 attempts.`);
          }
          collector.stop();
        }
      });

      collector.on('end', collected => {
        if (check == 0) {
          message.reply(`<:connguyenbeohutthuoc:1030508919887515749> Game over. You ran out of time. The number was ${number}`)
          const wins = df.get(`guess_wins_${message.author.id}`);
          df.set(`guess_wins_${message.author.id}`, wins - 5);
        }
        console.log(collector.collected.size);
      });
    }
    else if (args[0] == 'impossible') {
      const number = Math.floor(Math.random() * 1000000000) + 1;

      console.log(number);
      let attempts = 5;
      let limit = 5;
      let check = 0;

      await message.channel.send('I am thinking of a number between 1 and 1000000000. You have 5 attempts and 100 seconds to guess it. <:emoji_40:1113073468125229166>');

      const filter = m => !isNaN(m.content) && m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector({ filter, max: attempts, time: 100000 });

      collector.on('collect', async m => {
        const guess = parseInt(m.content);
        if (collector.collected.size !== 5) {
          if (guess === number) {
            check = 1;
            collector.stop();
            const score = (5 - attempts - collector.collected.size) * -1;
            message.reply(`<:teemo_wow:976865567204048947> 🎉 Congratulations! You guessed the number in ${score} attempts.`);

            const wins = await df.get(`guess_wins_${message.author.id}`);
            await df.set(`guess_wins_${message.author.id}`, (wins || 0) + 20);

            return;
          } else if (guess > number) {
            message.reply(`The number is lower than your guess. You have ${attempts - collector.collected.size} attempts left <:teemo_like:971798105169215529>`);
          } else {
            message.reply(`The number is higher than your guess. You have ${attempts - collector.collected.size} attempts left <:tkquannentusat:1056055687253348392>`);
          }
        } else {
          if (guess !== number) {
            const wins = await df.get(`guess_wins_${message.author.id}`);
            await df.set(`guess_wins_${message.author.id}`, (wins || 0) - 10);
            return message.reply(`<:connguyenbeohutthuoc:1030508919887515749> Game over. You ran out of attempts or time. The number was ${number}`);
          } else {
            message.reply(`<:teemo_wow:976865567204048947> 🎉 Congratulations! You guessed the number in 15 attempts.`);
          }
          collector.stop();
        }
      });

      collector.on('end', collected => {
        if (check == 0) {
          message.reply(`<:connguyenbeohutthuoc:1030508919887515749> Game over. You ran out of time. The number was ${number}`)
          const wins = df.get(`guess_wins_${message.author.id}`);
          df.set(`guess_wins_${message.author.id}`, wins - 10);
        }
        console.log(collector.collected.size);
      });
    }
  }
};

async function getTopGuessWinners() {
  const users = await df.list();
  const players = [];

  for (const user of users) {
    if (user.startsWith('guess_wins_')) {
      const userId = user.slice(11);
      const score = await df.get(user);
      players.push({ userId, score });
    }
  }

  return players
    .filter(player => player.score > 0)
    .sort((a, b) => b.score - a.score);
}

function getPlayerDisplayName(guild, userId) {
  const member = guild.members.cache.get(userId);
  if (member) {
    return member.nickname || member.user.username;
  }
  return 'Unknown';
}
