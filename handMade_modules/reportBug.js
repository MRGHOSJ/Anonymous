const Discord = require('discord.js')

module.exports.run = (message,client,args) => {
    
    let fullArg = args.join(" ")

    const BugReport = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8Nj7qJUXxFGNjGUKXHNp59Elswqoh4e4js4GHHaBBaiUibM8")
        .addField("Bug Repot: ", fullArg)
        .setTimestamp()
        .setFooter('Help |');

        const channel = client.channels.get(604051435411472405)
        channel.send(BugReport)

        message.reply("Bug report was sent to dev!")
}