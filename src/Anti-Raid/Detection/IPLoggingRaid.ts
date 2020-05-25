// import { Detection } from '../Classes/Detection';
// import { Message } from 'discord.js';
// import Config from '../../Config/Config';
// import { Violations } from '../Violations/Violations';
// import VL from '../../JSON/Violations.json'
// import { Implement } from '../Implement/Implement';
// import { recurrent } from 'brain.js';

// const ViolationHandler = new Violations(Config.Prefix)
// const ImplementHandler = new Implement(Config.Prefix)
// export class IPLoggingRaid extends Detection {
//     constructor(prefix : String) {
//         super(prefix)
//     }
//     async Handle(message : Message) {
//         const ipLoggers = ["grabify.link", "iplogger.org", "2no.co", "iplogger.com", "yip.su", "iplogger.ru", "gyazo.nl"]
//         message.channel.send(message.content)
//         for(var i = 0; i < ipLoggers.length; i++) {
//             await message.delete()
//             if(message.content.includes(ipLoggers[i])) {
//                 if(Config.AutoBan === true) {
//                     await message.member.ban( { reason: "Sending an IP-Logger"} )
//                     await message.channel.send(message.member.user.tag + " has sent a ip-logger url into the chat")
//                     return
//                 } else {
//                     await message.channel.send(message.member.user.tag + " has sent a ip-logger url into the chat")
//                     await ViolationHandler.issueViolation("IPLoggingRaid", message)
//                 }
//             }
//             if(VL.IPLoggingRaid >= 10) {
//                 if(Config.RaidImplement === true) {
//                     await ImplementHandler.Lockdown(message, "IPLoggingRaid")
//                 }
//             } else {
//                 await ViolationHandler.issueViolation("IPLoggingRaid", message)
//             }
//         }
//     }
// }