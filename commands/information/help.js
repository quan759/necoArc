module.exports = {
  name: 'help',
  description: 'Xem lệnh của bot',
  run: async (client, message, args) => {
    if (!args.length) {
      return message.channel.send('https://media.discordapp.net/attachments/1041230706271076363/1125350031491338341/image.png?width=1440&height=337');
    }
    if (args.length != 0) {
      const cont = args[0].toLowerCase();
      if (cont == 'fun') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125465747066454209/image.png?width=636&height=484');
      }
      else if (cont == 'moderation') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125352793478283324/image.png');
      }
      else if (cont == 'interaction') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125465288100560926/image.png?width=729&height=484');
      }
      else if (cont == 'information') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125352898520420463/image.png');
      }
      else if (cont == 'snake') {
        message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125463554993176686/image.png');
      }
      else if (cont == 'trivia') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125463634462658621/image.png?width=861&height=230');
      }
      else if (cont == 'ticTacToe') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125463713986650223/image.png');
      }
      else if (cont == 'connect4') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125463812376641597/image.png');
      }
      else if (cont == 'minesweeper') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125463868278329474/image.png');
      }
      else if (cont == 'fasttype') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125463937949904896/image.png');
      }
      else if (cont == 'guess') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125464044841730128/image.png?width=861&height=236');
      }
      else if (cont == 'roast') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125464096133881976/image.png');
      }
      else if (cont == 'rockpaperscissors') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125464178342232176/image.png?width=861&height=232');
      }
      else if (cont == '2048') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125465872824291339/image.png');
      }
      else if (cont == 'chess') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125468631795499080/image.png');
      }
      else if (cont == 'lichess') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125468665031180468/image.png?width=861&height=239');
      }
      else if (cont == 'avatar') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125468760652914819/image.png');
      }
      else if (cont == 'ping') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125468713991282758/image.png');
      }
      else if (cont == 'prefix') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125468886180053102/image.png');
      }
      else if (cont == 'say') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470200830103602/image.png?width=861&height=196');
      }
      else if (cont == 'calculation') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470246237634620/image.png');
      }
      else if (cont == 'imagine') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470298188283904/image.png?width=861&height=216');
      }
      else if (cont == 'snipe') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470350688391198/image.png');
      }
      else if (cont == 'ask') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470403737956352/image.png?width=861&height=231');
      }
      else if (cont == 'delete') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470467516547112/image.png?width=861&height=270');
      }
      else if (cont == 'link') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470522268987474/image.png?width=861&height=197');
      }
      else if (cont == 'chatcompletion') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470576232894625/image.png?width=861&height=223');
      }
      else if (cont == 'stopchatcompletion') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125470632461742160/image.png?width=861&height=204');
      }
      else if (cont == 'ban') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125471027368046643/image.png?width=861&height=249');
      }
      else if (cont == 'kick') {
        return message.channel.send('https://media.discordapp.net/attachments/1041230706271076364/1125471068417695744/image.png?width=861&height=258');
      }
      else{
        return message.channel.send('Invalid content!')
      }
    }
  }
};
