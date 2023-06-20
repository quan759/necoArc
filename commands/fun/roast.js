const fs = require('fs');

const rawData = fs.readFileSync('roasts.json');
const data = JSON.parse(rawData);

module.exports = {
  name : 'roast',
  description: 'oh hell nah',
  run: async(client, message, args) => {
    let name;
    if(!args.length || args[0] == '<@814668739664412703>'){
      name = message.author;
    }
    else{
      name = args[0];
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomMessage = data[randomIndex].roast;
    message.channel.send(`${name}, ${randomMessage}`);
  }
}