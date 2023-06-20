const axios = require('axios');

module.exports = {
  name: 'ask',
  description: 'Ask the bot a question',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'question',
      description: 'The question to ask',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.openai.com/v1/engines/text-davinci-003/completions',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        data: {
          prompt: `Hey Give me a response for this : ${interaction.options.getString('question')}.`,
          temperature: 0.00000001,
          max_tokens: 1000,
          top_p: 1.0,
          frequency_penalty: 0.5,
          presence_penalty: 0.0,
        },
      });
      const embed = {
        color: 0xF5DEB3,
        title: 'Bot Response',
        author: {
          name: 'Neco arc',
          url: 'https://discord.js.org',
        },
        description: `\`\`\`${response.data.choices[0].text}\`\`\``,
        timestamp: new Date(),
        footer: {
          text: 'Chat with a cat',
          icon_url: 'https://i.imgur.com/L0sBgsi.png',
        },
      };
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('Bot hiện đang gặp sự cố, vui lòng thử lại sau.');
    }
  },
};