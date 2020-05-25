/** Discord Libraries */
const Discord = require('discord.js')
/** Default Libraries */
import fs from 'fs';
/** Discord Classes */
import { Message, GuildMember } from 'discord.js';
/** Raid Classes */
import Config from './src/Config/Config'
import RaidHandler from './src/Anti-Raid/index';
const Raid = new RaidHandler();
import { MassJoinRaid } from './src/Anti-Raid/Detection/MassJoinRaid';
const MassJoinHandler = new MassJoinRaid(Config.Prefix)
/** Client Instance */
const client = new Discord.Client();
client.on('ready', async() => {
    console.log("Discord-AntiRaid Module Test is ready")
    client.user.setPresence({ activity: { name: `on ${client.guilds.cache.size} servers` }, status: 'idle' })
});
client.on('message', async(message : Message) => {
    if(message.content === `${Config.Prefix}liftlockdown`) { 
        if(message.member.hasPermission('ADMINISTRATOR')) { 
            message.channel.send("restored")
            var channels = message.guild.channels.cache.array()
            channels.forEach( channel => {
                channel.updateOverwrite(message.guild.id , {
                    SEND_MESSAGES: null
                });
            });
        }
    }
    if(message.content.toLowerCase() === `${Config.Prefix}setraidlogs`) { 
        if(message.member.hasPermission('ADMINISTRATOR')) { 
            var channel = message.mentions.channels.first();
            if(!channel) return message.reply("Please state a channel to configure Raid Logs to");
        }
    }
    if(message.content.startsWith(Config.Prefix)) return; // Implement command spamming later
    Raid.run(message)
    
})
client.on('guildMemberAdd', async(member : GuildMember , message : Message) => {
    await MassJoinHandler.Handle(member, message)
});
client.on('guildCreate', async(message : Message) => {

})
client.login('')
