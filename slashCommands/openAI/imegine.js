const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const userMap = {};

module.exports = {
  name: 'imagine',
  description: 'Generate an image based on a prompt',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'prompt',
      description: 'Enter anything you can imagine :)',
      type: 'STRING',
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const prompt = interaction.options.getString('prompt');
    if (!prompt) {
      return interaction.reply('Please provide a prompt for the image generation.');
    }

    const userId = interaction.user.id;
    const now = new Date();

    if (userMap[userId] && now - userMap[userId] < 24 * 60 * 60 * 1000 && interaction.user.id !== '814668739664412703') {
      const remainingTime = Math.round((userMap[userId] - now + 24 * 60 * 60 * 1000) / 1000 / 60);
      return interaction.reply(`You can only use this command once per day. Please try again in ${remainingTime} minutes.`);
    }

    try {
      const response = await openai.createImage({
        prompt,
        n: 1,
        size: "512x512",
      });

      interaction.reply(response.data.data[0].url);

      userMap[userId] = now;
    } catch (error) {
      console.error(error);
      interaction.reply('There was an error generating the image.');
    }
  },
};
