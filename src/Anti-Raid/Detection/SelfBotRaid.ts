// A detection that will determine if a user is a self bot (and automatically ban the user if that option is enabled)

import { Detection } from '../Classes/Detection';
import Discord, { Message, MessageEmbed } from 'discord.js';
import Config from '../../Config/Config';

export class SelfBotRaid extends Detection {
    private readonly prefix : String;
    constructor(prefix : String) {
        super(prefix)
    }
    async Handle(message : Message) {
        try {
            if ( // Code from https://github.com/marpme/AntiRaid-Discord/blob/master/index.js
                message.nonce === null && // Code from https://github.com/marpme/AntiRaid-Discord/blob/master/index.js
                message.attachments.size <= 0 && // Code from https://github.com/marpme/AntiRaid-Discord/blob/master/index.js
                !message.author.bot && // Code from https://github.com/marpme/AntiRaid-Discord/blob/master/index.js
                message.guild  // Code from https://github.com/marpme/AntiRaid-Discord/blob/master/index.js
              ) {
                if(message.author.bot) return
                if(Config.AutoBan === true) {
                    await message.member.ban( { reason: "Self-Bot"} ).then(() => {
                        message.channel.send(`${message.member.user.tag} has been banned for the use of a self bot`)
                    })
                }
            } else {
                return;
            }
        } catch (e) {
            console.log(e)
        }

    }
}