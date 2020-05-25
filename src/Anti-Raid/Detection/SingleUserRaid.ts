// A detection that will determine if a *SINGLE* user is raiding a server on a specific channel

import { Detection } from '../Classes/Detection';
import { Message } from 'discord.js';
import { Violations } from '../Violations/Violations';
import Violation from '../../JSON/Violations.json'
import Config from '../../Config/Config';
import { Implement } from '../Implement/Implement';

const ImplementHandler = new Implement(Config.Prefix)
const ViolationHandler = new Violations(Config.Prefix)
var aIntervalNodes : number;
export class SingleUserRaid extends Detection {
    constructor(prefix : String) {
        super(prefix);
    }
    async Handle(message : Message) {
        try {
        if(message.author.bot) return; // If the message is a bot, don't attempt to detect it
        var messages = (await message.channel.messages.fetch({ limit: 50 })).filter(m => m.author.id === message.author.id);
        if(messages.array().length < 10) return;
        var iMessages = messages.array().slice(0,11)
        var IntervalNodes: number[] = []
        for(var i = 0; i < iMessages.length - 1; i++) {
            var Interval = iMessages[i].createdTimestamp - iMessages[i + 1].createdTimestamp
            IntervalNodes.push(Interval)
        }
        var Total : number = 0
        for(var i : number = 0; i < IntervalNodes.length; i++) {
            Total += IntervalNodes[i]
            aIntervalNodes = Total/IntervalNodes.length
        }

        if(aIntervalNodes <= 1500) {
            if(Violation.SingleUserRaid >= 100 && Config.RaidImplement === true) {
                await ImplementHandler.Lockdown(message, "SingleUserRaid")
            } else {
                await ViolationHandler.issueViolation("SingleUserRaid", message)
            }
        }
    } catch (e) {
        console.log(e)
    }
        
    }
}