const Discord = require('discord.js');
const client = new Discord.Client();

// Api
const HandleIpCheckApi = require('./handMade_modules/ipCheckApi')

// hand made modules
const HandleCredits= require('./handMade_modules/credits')
const HandleReportBug = require('./handMade_modules/reportBug')
const HandleHelp = require('./handMade_modules/help')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity('@'+client.user.username+' '+'Help')
});

client.on('message', message => {
    if (message.channel instanceof Discord.DMChannel) {
        return;
    }else{
        if(message.author === client.user){
            return;
        }else{
            if(message.isMentioned(client.user)){

                const mantionLength = client.user.id.length +3
                const args = message.content.slice(mantionLength).trim().split(/ +/g);
                const command = args.shift().toLowerCase();

                if (command === "checkip"){
                    if (args[0]){
                        const IpPattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
                        if(!IpPattern.test(args[0])){
                            return message.reply('IP incorrect!')
                        }else{
                            HandleIpCheckApi.run(message,args)
                        }
                    }else{
                        return message.reply('No IP was inputed!')
                    }
                }

                if (command === "credits"){
                    HandleCredits.run(message)
                }

                if (command === "bug"){
                    if(args[0]){
                        HandleReportBug.run(message,client,args)
                    }else{
                        return message.reply("You didn't input any arguments!")
                    }
                }

                if (command === "help"){
                    HandleHelp.run(message, client)
                }

            }
        }
    }

});

client.login(process.env.token);