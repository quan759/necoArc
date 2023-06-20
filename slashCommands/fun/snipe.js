const deletedMsg = require('../../globalVar')

module.exports = {
  name: 'snipe',
  description: 'Xem tin nhắn vừa bị xóa',
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'position',
      description: 'Vị trí của tin nhắn đã xóa',
      type: 'STRING',
      required: true,
    }
  ],
  run: async (client, interaction, message, args) => {
    var deletedMessage = null
    const pos = interaction.options.getString('position') || 1;
    const deletedMessages = deletedMsg[interaction.channelId];

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
          text: `In #${interaction.channel.name} | ${pos}/10`,
          icon_url: interaction.guild.iconURL(),
        },
        timestamp: deletedMessage.createdTimestamp,
      };
      interaction.reply({ content: 'Thao tác thành công!', ephemeral: true });
      interaction.channel.send({ embeds: [snipeEmbed] });
    } else {
      interaction.channel.send('Invalid position or there are no deleted messages to snipe!');
    }
  },
};
