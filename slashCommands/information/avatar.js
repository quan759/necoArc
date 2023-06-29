const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: `Get someone's avatar`,
  type: 'CHAT_INPUT',
  options: [
    {
      name: 'user',
      description: 'The person whose avatar you want to retrieve',
      type: 'USER',
      required: false,
    },
  ],
  run: async (client, interaction, args) => {
    const user = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(user.id);
    const avatarURL = user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true });

    const embed = new MessageEmbed({
      color: 0xF5DEB3,
      author: {
        name: 'Neco arc',
        url: 'https://discord.js.org',
      },
      description: `\`${member.displayName}\`'s avatar'`,
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

    interaction.reply({ embeds: [embed] });
  },
};
