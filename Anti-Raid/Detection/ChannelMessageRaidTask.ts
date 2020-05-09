import Discord, { Message, MessageFlags } from 'discord.js'
import { Context } from '../../Handler/Context';

export var aCInterval : Number;
export class ChannelAntiRaid {
    private messages: Message[]
    private readonly prefix: string;

    constructor(prefix : string) {
        this.prefix = prefix
    }

    async handleMessage(message : Message): Promise<void> {
        if(message.author.bot) return;
        
        try{
        let messages;
        messages =  await message.channel.messages.fetch({ limit: 10 })
        if(messages.array().length < 10) return
        let fMessages =  messages.array().slice(0,11)

        var CintervalNodes: number[] = []
        for(var i = 0; i < fMessages.length - 1; i++) {
            let interval = fMessages[i].createdAt.getTime() - fMessages[i + 1].createdAt.getTime()
            CintervalNodes.push(interval)
        }
        let total = 0    
        for(var i = 0; i < CintervalNodes.length; i++) {
            total += CintervalNodes[i]
            aCInterval = total/CintervalNodes.length
        }
        messages = null
        
        
        } catch(err) {
            console.log(err)
        }
    }   
}

