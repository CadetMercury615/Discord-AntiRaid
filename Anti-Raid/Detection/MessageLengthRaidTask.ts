import Discord, { Message, MessageFlags, GuildMember } from 'discord.js'
import { Context } from '../../Handler/Context';
import VL from '../JSON/ViolationLevel.json'
import fs from 'fs';
import { RAID_IMPLEMENT } from '../../Config/Config.json'
import { ImplementAntiRaid } from '../Implementation/Implement';



export var aLength : Number;
export class MessageLengthAntiRaid {
    private messages : Message[];
    private readonly prefix: string;

    constructor(prefix: string) {
        this.prefix = prefix
    }

    async handleMessage(message : Message) {
        if (message.author.bot) return

        
        try{
        let messages
        messages =  await (await message.channel.messages.fetch({ limit: 10 }))
        if(messages.array().length < 10) return
        let fMessages : Message[] =  messages.array().slice(0,11)

        var LengthNodes: number[] = []
        for(var i = 0; i < fMessages.length - 1; i++) {
            let length : number = fMessages[i].content.length
            if(LengthNodes.length === 10) {
                LengthNodes.pop()
                LengthNodes.push(length)
            } else {
                LengthNodes.push(length)
            }
        }
        let total = 0    
        for(var i = 0; i < LengthNodes.length; i++) {
            total += LengthNodes[i]
            aLength = total/LengthNodes.length
        }
        messages = null

        if(aLength >= 500) {
            if(VL.MessageLength >= 100) {
                message.channel.send(RAID_IMPLEMENT)
                message.guild.owner.send(RAID_IMPLEMENT + " on your server, " + message.guild.name)
                VL.MessageLength = 0
                fs.writeFileSync("Bot/src/Anti-Raid/JSON/ViolationLevel.json", JSON.stringify(VL, null, 4))
                const Implement = new ImplementAntiRaid(this.prefix)
                Implement.Lockdown(message, "Excessive Message Length")
                // Insert Raid Implementaion here
                return

            } else {
                message.channel.send("Excessive Message Length: Raid Warning")
                let Floor = Math.floor(Math.random() * 15) +1
                VL.MessageLength = VL.MessageLength + Floor
                fs.writeFileSync("Bot/src/Anti-Raid/JSON/ViolationLevel.json", JSON.stringify(VL, null, 4))
                return
            }

        }


        } catch (e) {
            console.log(e)
        }
    }
}