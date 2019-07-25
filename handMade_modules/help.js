const Discord = require('discord.js')

module.exports.run = (message,client) => {
    
    const Help = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8Nj7qJUXxFGNjGUKXHNp59Elswqoh4e4js4GHHaBBaiUibM8")
        .addField('Check Ip: ', '@'+client.user.username+' '+"CheckIp "+"(IP goes here)", true)
        .addField('Report Bug: ','@'+client.user.username+' '+"Bug "+"(describe the bug)",true)
        .addField('Credits: ','@'+client.user.username+' '+"Credits",true)
        .setTimestamp()
        .setFooter('Help |');

        message.channel.send(Help);
}