import Discord, { Message, MessageFlags, GuildMember, PartialUser } from 'discord.js'
import { Context } from '../../Handler/Context';
import User from 'discord.js';

export class SelfBotAntiRaid {
    private readonly prefix: String;
    constructor(prefix : String) {
        this.prefix = prefix
    }

    async HandleSelfBot(message : Message) {
        if(message.nonce === null) {
            var member = message.member
            await message.channel.send(member.user.tag + " was banned for the use of a self-bot").then(async () => {
                await member.ban( { reason: "Self Bot"} )
                await message.delete( { timeout: 3000 } )    
            })


        } else {
            return
        }
    }
}
