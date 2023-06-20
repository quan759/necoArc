const axios = require('axios');
const querystring = require('querystring');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'calc',
  description: 'Calculates a math expression using Wolfram Alpha',
  aliases: ['chem', 'phy'],
  run: async (client, message, args) => {
    const input = args.join(' ');
    const appID = 'K5JJHW-PHVYRWWLLR';
    const apiUrl = `https://api.wolframalpha.com/v1/simple?appid=${appID}&i=${querystring.escape(input)}&fontsize=50`;

    try {
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      const embed = {
        color: 0xF5DEB3,
        title: `Solving math/chem/physic problem`,
        description: `:D`,
        author: {
          name: 'Neco arc',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
        image: {
          url: 'https://api.wolframalpha.com/v1/simple?appid=' + appID + '&i=' + querystring.escape(input),
        },
        timestamp: new Date(),
        footer: {
          text: 'Neco arc',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
      };
      message.channel.send({ embeds: [embed]});
    } catch (error) {
      console.error(error);
      await message.channel.send('There was an error while processing your request.');
    }
  },
};
