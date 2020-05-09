import Discord, { Message, MessageFlags } from 'discord.js'
import { Context } from '../../Handler/Context';
import VL from '../JSON/ViolationLevel.json'
import Config, {RAID_IMPLEMENT} from '../../Config/Config.json'
import fs from 'fs';
import { ImplementAntiRaid } from '../Implementation/Implement';

export var aSInterval: Number
export class SingleAntiRaid {
    private messages: Message[]
    private authors: String[]
    private readonly prefix: string;

    constructor(prefix : string) {
        this.prefix = prefix
    }

    async handleMessage(message : Message): Promise<void> {
        if(message.author.bot) return;
        
        try{
        // Fetch authors last 10  messages from a group of 75
        let messages =  await (await message.channel.messages.fetch({ limit: 75 })).filter(m => m.author.id === message.author.id)
        var authors : String[];

        if(messages.array().length < 10) return
        let fMessages =  messages.array().slice(0,11)

        var SintervalNodes: number[] = []

        for(var i = 0; i < fMessages.length - 1; i++) {
            let interval = fMessages[i].createdAt.getTime() - fMessages[i + 1].createdAt.getTime()
            SintervalNodes.push(interval)
        }
        var total = 0
        for(var i = 0; i < SintervalNodes.length; i++) {
            total += SintervalNodes[i]
            aSInterval = total/SintervalNodes.length
        }

        if(aSInterval <= 1000) {
            if(VL.SingleUserRaid >= 100) {
                message.channel.send(RAID_IMPLEMENT)
                message.guild.owner.send(RAID_IMPLEMENT + " on your server, " + message.guild.name)
                VL.SingleUserRaid = 0
                fs.writeFileSync("Bot/src/Anti-Raid/JSON/ViolationLevel.json", JSON.stringify(VL, null, 4))
                const Implement = new ImplementAntiRaid(this.prefix)
                Implement.Lockdown(message, "Single User Raid")
            } else {
                message.channel.send("Excessive Message Length: Raid Warning")
                let Floor = Math.floor(Math.random() * 15) +1
                VL.SingleUserRaid = VL.SingleUserRaid + Floor
                fs.writeFileSync("Bot/src/Anti-Raid/JSON/ViolationLevel.json", JSON.stringify(VL, null, 4))
                return 
            }
        }


        } catch(err) {
            console.log(err)
        }


    }
}