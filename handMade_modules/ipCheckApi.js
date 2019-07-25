const Discord = require('discord.js')
const snekfetch = require('snekfetch')

module.exports.run = (message,args) => {
    ApiFresh(message,args)
    setTimeout(
        function(){
            firstApi(message,args)
            SecondApi(message,args)
        }
        , 1000);
    
}

ApiFresh = async (message,args) =>{
    await snekfetch.get('http://check.getipintel.net/check.php?ip='+args[0]+'&contact=bouzouitayassine@gmail.com')
    .then(function(){
        return;
    })
}

firstApi = async (message,args) => {
    await snekfetch.get('https://www.ipqualityscore.com/api/json/ip/zsnjMjFM4n76LILqq3L5wlD5AbohKqPK/'+args[0])
    .then(r =>{
        let body = r.body

        let countryCode = body.country_code
        let region = body.region
        let city = body.city
        let ISP = body.ISP
        let organization = body.organization
        let timezone = body.timezone

        if (countryCode === ""){
            countryCode = undefined
        }

        if (region === ""){
            region = undefined
        }

        if (city === ""){
            city = undefined
        }

        if (ISP === ""){
            ISP = undefined
        }

        if (organization === ""){
            organization = undefined
        }

        if (timezone === ""){
            timezone = undefined
        }

        const FirstApiEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8Nj7qJUXxFGNjGUKXHNp59Elswqoh4e4js4GHHaBBaiUibM8")
        .addBlankField()
        .addField('Country Code: ', countryCode, true)
        .addField('Region: ', region , true)
        .addField('City: ', city, true)
        .addField('ISP: ', ISP , true)
        .addField('Organization: ', organization, true)
        .addField('Timezone: ', timezone, true)
        .setTimestamp()
        .setFooter('Ip Checker |');

        message.channel.send(FirstApiEmbed);
    }).catch(r=>{
        message.reply('An Error has occurred. Please try again!')
        console.log(r)
    })
}

SecondApi = async (message,args) => {
    await snekfetch.get('http://check.getipintel.net/check.php?ip='+args[0]+'&contact=bouzouitayassine@gmail.com')
    .then(r =>{
        let body = r.body

        let VpnProxy = ""

        if (body == 0){
            VpnProxy = ":white_check_mark: Clean"
        }else if (body < 0.995 && body > 0){
            VpnProxy = ":heavy_check_mark: Low Risk"
        }else if (body == 1){
            VpnProxy = ":warning: Vpn / Proxy detected"
        }else if (body >= 0.995){
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
