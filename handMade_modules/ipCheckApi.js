const Discord = require('discord.js')
const snekfetch = require('snekfetch')

module.exports.run = (message,args,NotSureIp) => {
    SecondApi(message,args,NotSureIp)
    firstApi(message,args)
}

firstApi = async (message,args) => {
    await snekfetch.get('https://www.ipqualityscore.com/api/json/ip/zsnjMjFM4n76LILqq3L5wlD5AbohKqPK/'+args[0])
    .then(r =>{
        let body = r.body

        const FirstApiEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription("If chances are lower than 0.9 that means, the bot can't identify this user having VPN or not.")
        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8Nj7qJUXxFGNjGUKXHNp59Elswqoh4e4js4GHHaBBaiUibM8")
        .addBlankField()
        .addField('Country Code: ', body.country_code, true)
        .addField('Region: ', body.region , true)
        .addField('City: ', body.city, true)
        .addField('ISP: ', body.ISP , true)
        .addField('Organization: ', body.organization, true)
        .addField('Timezone: ', body.timezone, true)
        .addField('PS: ', "If Chances= 0 run the cmd again. (If your got 0 as a chance twice that means the ip is clean!)")
        .setTimestamp()
        .setFooter('Ip Checker |');

        message.channel.send(FirstApiEmbed);
    }).catch(function(){
        message.reply('An Error has occurred. Please try again!')
    })
}

SecondApi = async (message,args,NotSureIp) => {
    await snekfetch.get('http://check.getipintel.net/check.php?ip='+args[0]+'&contact=bouzouitayassine@gmail.com')
    .then(r =>{
        let body = r.body

        let VpnProxy = ""

        if (body == 0){
            if(NotSureIp.indexOf(args[0]) != -1){
                VpnProxy = ":white_check_mark: Clean"
            }else{
                VpnProxy = ":interrobang: Not Sure"
                NotSureIp.push(args[0])
            }
        }else if (body < 0.95 && body > 0){
            VpnProxy = ":heavy_check_mark: Low Risk"
        }else if (body == 1){
            VpnProxy = ":warning: Vpn / Proxy detected"
        }else if (body >= 0.95){
            VpnProxy = ":x: High Risk"
        }else if (body <= 0){
            VpnProxy = ":exclamation: This IP is privet / unrouted"
        }

        const SecondApiEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .addField('Vpn / Proxy :', VpnProxy)
        .addField('Chances :', body)
        .setTimestamp()
        .setFooter('Vpn / Prox Checker |');

        message.channel.send(SecondApiEmbed);
    }).catch(r =>{
        if(r.statusCode === 400){
            const SecondApiEmbedERR = new Discord.RichEmbed()
            .setColor('#0099ff')
            .addField('Vpn / Proxy :', ":exclamation: Private IP")
            .addField('Chances :', -1)
            .setTimestamp()
            .setFooter('Vpn / Proxy Checker |');

            message.channel.send(SecondApiEmbedERR);
        }else{
            message.reply("StatusCode: "+r.statusCode)
            message.reply("StatusText: "+r.statusText)
            console.log(r)
        }
    })
}
