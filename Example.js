import Discord from 'discord.js'

import { ChannelAntiRaid } from './Anti-Raid/Detection/ChannelMessageRaidTask'
import { SingleAntiRaid } from './Anti-Raid/Detection/SingleMessageRaidTask'
import { MessageLengthRaid } from './Anti-Raid/Detection/MessageLengthRaidTask'
import  { SelfBotAntiRaid } from './Bot/src/Anti-Raid/Detection/SelfBot'



const client = new Discord.Client()
const prefix = "?" // You can just use an external config file
const Token = "89342089032uifhkfdskh9hkllkd" // You can just use an external config file


const ChannelHandler = new ChannelAntiRaid(prefix)
const SingleMessageHandler = new SingleAntiRaid(prefix)
const MessageLengthHandler = new MessageLengthRaid(prefix)
const SelfBotHandler = new SelfBotAntiRaid(Config.PREFIX)

client.on('ready', async() => {
    console.log("Bot is ready")
})

client.on('message', async(message) => {
    	if(message.content === '-undo') {
		if(message.author.id !== "YourOwnerId") return
		var channels = message.guild.channels.cache.array()
        channels.forEach( channel => {
            channel.updateOverwrite(message.guild.id , {
                SEND_MESSAGES: null
            });
		});
SelfBotHandler.HandleSelfBot(message)
    ChannelHandler.handleMessage(message)
    SingleMessageHandler.handleMessage(message)
    MessageLengthHandler.handleMessage(message)

})
