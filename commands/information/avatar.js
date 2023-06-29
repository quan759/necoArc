const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  category: 'fun',
  aliases: ['avt'],
  run: async (client, message, args) => {
    let user = message.mentions.users.first();
    if (!user) user = message.author;

    const member = await message.guild.members.fetch(user.id);
    const avatarURL = user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });

    const embed = new MessageEmbed({
      color: 0xF5DEB3,
      author: {
        name: 'Neco arc',
        url: 'https://discord.js.org',
      },
      description: `Avatar của \`${member.displayName}\``,
      image: {
        url: avatarURL,
      },
      fields: [
        {
          name: 'Joined Discord on',
          value: `\`${new Date(user.createdAt).toLocaleDateString()}\``,
          inline: true,
        },
        {
          name: 'Joined server at', 
          value: `\`${new Date(member.joinedAt).toLocaleDateString()}\``,
          inline: true,
        },
      ],
      footer: {
        text: `ID: ${user.id}`,
        icon_url: 'https://i.imgur.com/L0sBgsi.png',
      },
      timestamp: new Date(),
    });
    message.channel.send({ embeds: [embed] });
  },
};
