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
      color: '#0000FF',
      author: {
        name: `${message.guild.me.displayName}`,
        url: client.user.displayAvatarURL({ dynamic: true }),
      },
      description: ` \`${member.displayName}\`'s avatar`,
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
        icon_url: client.user.displayAvatarURL({ dynamic: true }),
      },
      timestamp: new Date(),
    });
    message.channel.send({ embeds: [embed] });
  },
};
