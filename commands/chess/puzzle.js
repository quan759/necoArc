const axios = require('axios');

module.exports = {
  name: 'puzzle',
  description: 'Hiển thị puzzle chess.com',
  run: async (client, message, args) => {
    const response = await axios.get('https://api.chess.com/pub/puzzle/random');
    const data = response.data;
    message.channel.send(data.image);
    console.log(data.pgn)
  }
};