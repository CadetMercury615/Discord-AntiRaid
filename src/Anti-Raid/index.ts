import { MassChannelRaid } from './Detection/MassChannelRaid';
import { SingleUserRaid } from './Detection/SingleUserRaid';
import { SelfBotRaid } from './Detection/SelfBotRaid';
import { MassLengthRaid } from './Detection/MassLengthRaid';
import { Detection } from './Classes/Detection';
import Config from '../Config/Config';
import { Message } from 'discord.js';

class RaidHandler {
    private SingleUserHandler: Detection = new SingleUserRaid(Config.Prefix);
    private MassChannelHandler: Detection = new MassChannelRaid(Config.Prefix);
    private SelfBotHandler: Detection = new SelfBotRaid(Config.Prefix);
    private MassLengthHandler: Detection = new MassLengthRaid(Config.Prefix);

    async run(message: Message) {
        this.SingleUserHandler.Handle(message);
        this.MassChannelHandler.Handle(message);
        this.SelfBotHandler.Handle(message);
        this.MassLengthHandler.Handle(message);
    }
}
export default RaidHandler;