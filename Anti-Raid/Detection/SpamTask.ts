import Discord, { Message, MessageFlags } from 'discord.js'
import { Context } from '../../Handler/Context';

export var SpamViolation : String[];

export class SpamAntiRaid {
    private readonly prefix: string;

    constructor(prefix : string) {
        this.prefix = prefix
    }

    async LinkHandler(message : Message) {
        if(message.content.includes("http:") || message.content.includes("https:") || message.content.includes("www.")) {
            message.delete( { reason : "Contains a Link" } )
            message.reply("Links are not permitted").then((message) => {
                message.delete( { timeout : 3000 } )
                if(SpamViolation.length === 10) {
                    SpamViolation.pop()
                    SpamViolation.push('Link')
                } else {
                    SpamViolation.push('Link')
                }

            })
        }
    }
    async InviteHandler(message : Message) {
        if(message.content.includes("discord.com/invite")) {
            message.delete( { reason : "Contains an Invite" } )
            message.reply("Invites are not permitted").then((message) => {
                message.delete( { timeout : 3000 } )
                if(SpamViolation.length === 10) {
                    SpamViolation.pop()
                    SpamViolation.push('Invite')
                } else {
                    SpamViolation.push('Invite')
                }
            })
        }
    }

}