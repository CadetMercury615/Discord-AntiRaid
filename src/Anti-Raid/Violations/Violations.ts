import Discord, { Message, TextChannel, Channel } from 'discord.js';
import VL from '../../JSON/Violations.json'
import Config from '../../Config/Config';
import fs from 'fs'
export class Violations {
    private readonly prefix: String;
    constructor(prefix : String) {
        this.prefix = prefix
    }
    async issueViolation(reason : any, message : Message) {
        try {
            var int = Math.floor(Math.random() * 5) + 1
            if(!reason) console.error("State a valid reason to issue violation")
            VL[reason.toString()] = VL[reason.toString()] + int
            if(!Config.RaidChannel) return console.error("State a 'RaidChannel' in the Config/Config.ts")
            const RaidChannel: Channel = message.guild.channels.cache.find(c => c.id === Config.RaidChannel)
            if (!((RaidChannel): RaidChannel is TextChannel => RaidChannel.type === 'text')(RaidChannel)) return; // Code to suppress annyoing Typescript 'type' error
            var embed = new Discord.MessageEmbed()
            .setTitle('Raid Violation Detected')
            .addField('Alledged User', message.member.user.tag)
            .addField('Check Violated', reason)
            .addField('Violation Level', VL[reason.toString()] + "%")
            await RaidChannel.send(embed)
            // await RaidChannel.send(`\n**${message.member.user.tag}** has violated the **${reason}** check.\nViolation Level for **${reason}** has increased to ${VL[reason]}%\n`)
            fs.writeFileSync("src/JSON/Violations.json", JSON.stringify(VL, null, 4))
        } catch (e) {
            console.log(e)
        }

    }
}