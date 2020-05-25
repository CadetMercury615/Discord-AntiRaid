import { Detection } from '../Classes/Detection';
import { GuildMember, Message } from 'discord.js';
import { Violations } from '../Violations/Violations';
import Config from '../../Config/Config';

const ViolationHandler = new Violations(Config.Prefix)
var aIntervalNodes: number;
export class MassJoinRaid {
    private readonly prefix: String;
    constructor(prefix : String) {
        this.prefix = prefix
    }
    async Handle(member : GuildMember, message : Message) {
        var JoinedAt : number[] =[]
        var Joined = member.joinedTimestamp
        JoinedAt.push(Joined)
        JoinedAt = JoinedAt.reverse()
        if(JoinedAt.length < 10) return
        var IntervalNodes : number[] = []
        for(var i = 0; JoinedAt.length; i++) {
            IntervalNodes.push(JoinedAt[i] + JoinedAt[i + 1])
        }
        var Total = 0
        for(var i = 0; i < IntervalNodes.length; i++) {
            Total += IntervalNodes[i]
            aIntervalNodes = Total/IntervalNodes.length
        }
        if(aIntervalNodes <= 2500) {
            await ViolationHandler.issueViolation("MassJoinRaid", message)
        }
    }
}