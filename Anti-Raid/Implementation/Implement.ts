import Discord, { Channel, Message, Client, TextChannel } from 'discord.js';
import { request } from "http";

export class ImplementAntiRaid {
    constructor (prefix : string) {
    }
    async Lockdown(message : Message, type: string) {
        const client : Client = new Discord.Client()
        var channels = message.guild.channels.cache.array()
        channels.forEach( channel => {
            channel.updateOverwrite(message.guild.id , {
                SEND_MESSAGES: false
            });
        });
        var x = new Date
        x.getFullYear() + '-' + x.getMonth() + '-' + x.getDay() + ' | ' + x.getHours() + x.getMinutes();
        var embed = new Discord.MessageEmbed()
        .setTitle("Raid Detected | Guild Lockdown")
        .addField("**Type of Raid detected**", type)
        .addField("**What does this mean?**", 'A raid has been detected in our systems')
        .addField("**Time of Lockdown**","```" + x + "```")
        await message.channel.send(embed)
        var sGuild = message.guild.id
        var myChannel = "662882529975730190"
        client.users.fetch("522895569039917066").then((user) => {
            user.send("There is a raid on server " + sGuild)
        })
    }
}