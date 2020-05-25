export type iConfig = {
    Prefix : string,
    RaidImplement : boolean,
    AutoBan : boolean,
    RaidChannel: string;
}

export var Config : iConfig = {
    Prefix : "?",
    RaidImplement: true, // If true, it will activate the Anti-Raid implmentations upon detecting a raid (i.e Lock all the channels, issue a ban wave, etc.) 
    AutoBan: false, // If true, auto bans will be issued upon detecting a raid from a specific user (i.e Ban waves, self-bots)
    RaidChannel: "709514099960316065"
}
export default Config