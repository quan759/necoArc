const axios = require('axios');
const querystring = require('querystring');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'calc',
  description: 'solve anything that you are too dumb to solve it :)',
  options: [{
    name: 'expression',
    type: 'STRING',
    description: 'The math/chem/physic expression to calculate',
    required: true,
  }],
  run: async (client, interaction) => {
    message.channel.sendTyping();
    const input = interaction.options.getString('expression');
    const appID = 'K5JJHW-PHVYRWWLLR';
    const apiUrl = `https://api.wolframalpha.com/v1/simple?appid=${appID}&i=${querystring.escape(input)}`;

    try {
      const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
      const attachment = new MessageAttachment(response.data, 'math.png');
      const embed = {
        color: 0xF5DEB3,
        title: `Solving math/chem/physic problem`,
        description: `:D`,
        author: {
          name: 'Neco arc',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
        image: {
          url: 'attachment://math.png',
          width: 800,
          height: 600
        },
        timestamp: new Date(),
        footer: {
          text: 'Neco arc',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
      };
      await interaction.reply({ embeds: [embed], files: [attachment] });
    } catch (error) {
      console.error(error);
      await interaction.reply('There was an error while processing your request.');
    }
  },
};
