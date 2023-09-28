const { Client, Intents, Collection } = require('discord.js');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const keepAlive = require("./server")
const db = require('./database');
const rdb = require('./database');

require('dotenv').config()

const deletedMsg = require('./globalVar');
const chatConversation = {};
const userMap = {};

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
});

const deletedMessages = new Collection();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();

['command', 'event', 'slashCommand'].forEach(handler => require(`./handlers/${handler}`)(client));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageDelete', function (message) {
  if (!deletedMsg[message.channel.id]) {
    deletedMsg[message.channel.id] = [];
  }

  const deletedMessages = deletedMsg[message.channel.id];
  deletedMessages.unshift(message);

  if (deletedMessages.length > 10) {
    deletedMessages.pop();
  }
});

let activeChannel = null, check = 0, flag = 0;

client.on('messageCreate', async function (message) {

  let date = new Date();
  date.setUTCHours(date.getUTCHours() + 7);
  
  if(message.author.bot) return;

  if (message.content.startsWith('whitelist') & message.author.id == '814668739664412703') {
    const user = message.mentions.members.first();
    await rdb.set(user.id, true);
    await message.channel.send('Sucess <:emoji_40:1113073468125229166>')
  }

  if (message.content.toLowerCase() === 'chatcompletion' || message.content.toLowerCase() === 'stopcompletion') {
    return message.channel.send('This comment has been changed to #active and #deactivate.');
  }

  if (await rdb.get(message.channel.id) && !message.content.startsWith('//') && !message.content.startsWith('nco') || message.content.toLowerCase().includes('<@1041230301340368896>')) {

    let conversationLog = [
      { role: 'system', content: 'You are a friendly chat bot named Neco Arc, you must provide answer fewer than 2000 in length' },
      { role: 'user', content: `Who's your developer?` },
      { role: 'assistant', content: 'He is Quan. His full name is Ngo Hong Quan' },
      { role: 'user', content: `Can you give me your developer's profile card?`},
      { role: 'assistant', content: 'Here it is: https://quan759.github.io'},
      { role: 'user', content: `who are you?`},
      { role: 'assistant', content: `I'm a Discord bot named Neco Arc. You can view my documentation to learn more about me. Here is its link:  https://neco.quan0rznt759.repl.co/`}
];

    try {
  await message.channel.sendTyping();

  let prevMessages = await message.channel.messages.fetch({ limit: 15 });
  prevMessages.reverse();

  prevMessages.forEach((msg) => {
    if (msg.author.id !== message.author.id) return;
    if(message.author.bot) return;

    conversationLog.push({
      role: 'user',
      content: msg.content,
    });
  });

  const result = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: conversationLog,
      max_tokens: 2000
    })
    .catch((error) => {
      console.log(`OPENAI ERR: ${error}`);
    });

  let response = result.data.choices[0].message.content;

  if (response.length <= 2000) {
    message.channel.send(result.data.choices[0].message);
  } else {
    const firstPart = response.slice(0, 2000);
    const secondPart = response.slice(2000);

    message.channel.send(firstPart);
    message.channel.send(secondPart);
  }
} catch (error) {
  console.error(error);
  message.reply('There was an error generating the response.');
}

  }
  console.log(message.author.username);
  console.log(message.content);
  console.log("-----------------------");
  console.log(date.getHours())
});

keepAlive();

client.login(process.env.TOKEN);