import { Detection } from '../Classes/Detection';
import { Message } from 'discord.js';
import VL from '../../JSON/Violations.json'
import { Implement } from '../Implement/Implement';
import Config from '../../Config/Config';
import { Violations } from '../Violations/Violations';

const ImplementHandler = new Implement(Config.Prefix)
const ViolationHandler = new Violations(Config.Prefix)
var aLengthNodes: Number;
export class MassLengthRaid extends Detection {
    constructor(prefix : String) {
        super(prefix)
    }
    async Handle(message : Message) {
        if(message.author.bot) return; // If the message is a bot, don't attempt to detect it
        var messages = (await message.channel.messages.fetch({ limit: 50 }))
        if(messages.array().length < 10) return;
        var iMessages = messages.array().slice(0,11)
        var LengthNodes: number[] = []
        for(var i = 0; i < iMessages.length - 1; i++) {
            var Length = iMessages[i].content.length
            LengthNodes.push(Length)
        }
        var Total : number = 0
        for(var i : number = 0; i < LengthNodes.length; i++) {
            Total += LengthNodes[i]
            aLengthNodes = Total/LengthNodes.length
        }
        if(aLengthNodes >= 500) {
            if(VL.MassChannelRaid >= 100 && Config.RaidImplement === true) {
                await ImplementHandler.Lockdown(message, "MassChannelRaid")
            } else {
                await ViolationHandler.issueViolation("MassChannelRaid", message)
            }
        }
    }
}