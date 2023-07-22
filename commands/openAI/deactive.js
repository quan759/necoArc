const rdb = require('../../database');
module.exports = {
  name: 'deactive',
  run: async(client, message) => {
    const isActive = await rdb.get(message.channel.id);
    if (!isActive) {
      return message.channel.send('This channel has not activated ChatCompletion yet, or you have not activated any channel.');
    }
    await rdb.set(message.channel.id, false);
    await message.channel.send('You have stopped ChatCompletion.');
  }
}