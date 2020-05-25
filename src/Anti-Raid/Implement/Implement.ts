import Discord, { Message, Client, VolumeInterface } from "discord.js";
import Config from "../../Config/Config";
import { GuildMember } from 'discord.js';
import VL from '../../JSON/Violations.json'
import fs from 'fs';

const client : Client = new Discord.Client()
export class Implement {
    private readonly prefix: String;
    constructor(prefix : String) {
        this.prefix = prefix
    }

    async Lockdown(message : Message, type : any) {
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
        .setColor("RED")
        .addField("**Type of Raid detected**", type)
        .addField("**What does this mean?**", 'An apparent raid has been detected within our guild systems and thus we have locked the server down')
        .addField("**Time of Lockdown**","```" + x + "```")
        .setFooter("Admins: If this Raid lockdown is a mistake or has been resolved, perform ?liftlockdown. If this raid was a mistake, please use ?support to report the accidental lockdown")
        message.channel.send(embed)
        VL[type] = 0
        fs.writeFileSync("src/JSON/Violations.json", JSON.stringify(VL, null, 4))
        return
    }
    async AutoBan(array : GuildMember[]) {

    }
}