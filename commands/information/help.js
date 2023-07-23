const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Xem lệnh của bot',
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setDescription(`The bot prefix is: **nco**`)
            .setColor('0xF5DEB3')
            .setAuthor({ name: `${message.guild.me.displayName}'s here, what's your emergency`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 })) 
            .addField(`❯ Information: [6]`, `\`help\`, \`ping\`, \`prefix\`, \`avatar\`, \`chess\`, \`lichess\``)
            .addField(`❯ Interaction: [9]`, `\`say\`, \`delete\`, \`link\`, \`ask\`, \`snipe\`, \`imagine\`, \`calc\`, \`active\`, \`deactive\``)
            .addField(`❯ Moderation: [2]`, `\`ban\`, \`kick\``)
            .addField(`❯ Fun: [12]`, `\`tzfe\`, \`ms\`, \`c4\`, \`ttt\`, \`cf\`, \`ft\`, \`guess\`, \`roast\`, \`rps\`, \`slot\`, \`snake\`, \`trivia\``)
            .addField(`❯ Fish: [3]`, `\`catch\`, \`sell\`, \`inv\``)
            .addField(`❯ Filters: [23]`, `\`3d\`, \`bass\`, \`china\`, \`chipmunk\`, \`dance\`, \`darthvader\`, \`doubletime\`, \`earrape\`, \`equalizer\`, \`nightcore\`, \`pitch\`, \`pop\`, \`rate\`, \`reset\`, \`slowmotion\`, \`soft\`, \`speed\`, \`superbass\`, \`treblebass\`, \`tremolo\`, \`vaporwave\`, \`vibrate\`, \`vibrato\``)
            .addField(`❯ Filters: [23]`, `\`3d\`, \`bass\`, \`china\`, \`chipmunk\`, \`dance\`, \`darthvader\`, \`doubletime\`, \`earrape\`, \`equalizer\`, \`nightcore\`, \`pitch\`, \`pop\`, \`rate\`, \`reset\`, \`slowmotion\`, \`soft\`, \`speed\`, \`superbass\`, \`treblebass\`, \`tremolo\`, \`vaporwave\`, \`vibrate\`, \`vibrato\``)
            .addField(`❯ Music: [20]`, `\`247\`, \`clear\`, \`forward\`, \`join\`, \`leave\`, \`loop\`, \`loopall\`, \`nowplaying\`, \`pause\`, \`play\`, \`queue\`, \`replay\`, \`resume\`, \`rewind\`, \`search\`, \`seek\`, \`shuffle\`, \`skip\`, \`skipto\`, \`volume\``);
      message.channel.send({embeds: [embed]});
    }
};
