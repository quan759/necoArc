const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'server',
    run: async (client, message) => {
        const embed = {
      color: '#0000FF',
      title: 'Servers',
      author: {
        name: `${message.guild.me.displayName}`,
        url: client.user.displayAvatarURL({ dynamic: true }),
      },
      description: `I'm in ${client.guilds.cache.size} server(s):\n\`\`\`${client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')}\`\`\``,
           timestamp: new Date(),
      footer: {
        text: ':D',
        icon_url: client.user.displayAvatarURL({ dynamic: true }),
      },
    };
    message.channel.send({ embeds: [embed] });
  }
}