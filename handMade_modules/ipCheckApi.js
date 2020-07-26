const Discord = require('discord.js')
const snekfetch = require('snekfetch')

module.exports.run = (message,args) => {
    ApiFresh(message,args)
    setTimeout(
        function(){
            SecondApi(message,args)
        }
        , 1000);
    
}

ApiFresh = async (message,args) =>{
    await snekfetch.get('http://check.getipintel.net/check.php?ip='+args[0]+'&contact=yilija3668@lege4h.com')
    .then(function(){
        return;
    })
}

SecondApi = async (message,args) => {
    await snekfetch.get('http://check.getipintel.net/check.php?ip='+args[0]+'&contact=yilija3668@lege4h.com')
    .then(r =>{
        let body = r.body

        let VpnProxy = ""

        if (body == 0){
            VpnProxy = ":white_check_mark: Clean"
        }else if(body == 0.5){
            VpnProxy = ":grey_question:  Not Sure"
        }else if (body < 0.90 && body > 0){
            VpnProxy = ":heavy_check_mark: Low Risk"
        }else if (body == 1){
            VpnProxy = ":warning: Vpn / Proxy detected"
        }else if (body >= 0.90){
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
