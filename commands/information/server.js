const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'server',
    run: async (client, message) => {
        const embed = {
      color: 0xF5DEB3,
      title: 'Servers',
      author: {
        name: 'Neco arc',
        url: 'https://discord.js.org',
      },
      description: `I'm in ${client.guilds.cache.size} server(s):\n\`\`\`${client.guilds.cache.map(guild => `${guild.name} (${guild.id})`).join('\n')}\`\`\``,
           timestamp: new Date(),
      footer: {
        text: ':D',
        icon_url: 'https://i.imgur.com/L0sBgsi.png',
      },
    };
    message.channel.send({ embeds: [embed] });
  }
}