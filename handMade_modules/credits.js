const Discord = require('discord.js')

module.exports.run = (message) => {
    
    const creditEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8Nj7qJUXxFGNjGUKXHNp59Elswqoh4e4js4GHHaBBaiUibM8")
        .addBlankField()
        .addField('Vpn / Proxy Checker: ', "https://getipintel.net/", true)
        .addField('Ip Checker: ','https://www.ipqualityscore.com',true)
        .addField('Bot Developer: ','MR.GHOST#3305',true)
        .addField('Bot Tester: ','LittLe#0714',true)
        .setTimestamp()
        .setFooter('Credits |');

        message.channel.send(creditEmbed);
}