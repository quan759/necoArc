const rdb = require('../../database');
module.exports = {
  name: 'active',
  run: async(client, message) => {
    const isActive = await rdb.get(message.channel.id);
    if (!isActive) {
      await rdb.set(message.channel.id, true);
      await message.channel.send('You have activated ChatCompletion. Please type your message.');
    }
    else {
      return message.channel.send('You have already activated Chatcompletion in this channel')
    }
  }
}