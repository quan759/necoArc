const deletedMsg = require('../../globalVar');

module.exports = {
  name: 'snipe',
  category: 'fun',
  description: 'Xem tin nhắn vừa bị xóa',
  run: async (client, message, args) => {
    const pos = parseInt(args[0]) || 1;
    const deletedMessages = deletedMsg[message.channel.id];

    if (deletedMessages && pos >= 1 && pos <= deletedMessages.length) {
      const deletedMessage = deletedMessages[pos - 1];

      const snipeEmbed = {
        color: 0xF5DEB3,
        title: 'get snipe nerd',
        author: {
          name: deletedMessage.author.tag,
          icon_url: deletedMessage.author.avatarURL(),
        },
        description: deletedMessage.content,
        footer: {
          text: `In #${message.channel.name} | ${pos} / ${deletedMessages.length}`,
          icon_url: message.guild.iconURL(),
        },
        timestamp: deletedMessage.createdTimestamp,
      };

      message.channel.send({ embeds: [snipeEmbed] });
    } else {
      message.channel.send('Invalid position or there are no deleted messages to snipe!');
    }
  },
};
