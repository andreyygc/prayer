import {Channel} from "./types";


export class API {

    private headers: Headers | undefined;

    public channel: Channel | undefined;

    private constructor() {}

    public static async init(authorization: string, channelId: string): Promise<API> {
        const api = new API()
        api.headers = new Headers([
            ["referer", `https://discord.com/`],
            ["origin", "https://discord.com/"],
            ["user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9173 Chrome/128.0.6613.186 Electron/32.2.2 Safari/537.36"],
            ["content-type", "application/json"],
            ["authorization", `${authorization}`]
        ])
        api.channel = await api.getChannelInfo(channelId);
        return api;
    }

    public async sendPrayer(): Promise<Response> {
        const body = {
            "content": "<:MatsuriPray:1283098778240548925>",
            "nonce": API.generateSnowflake()
        }
        return fetch(`https://discord.com/api/v9/channels/${this.channel?.id}/messages`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(body)
            })
    }

    private async getChannelInfo(channelId: string): Promise<Channel> {
        const channelRes = await fetch(`https://discord.com/api/v9/channels/${channelId}`, {
            method: "GET",
            headers: this.headers,
        })
        if (!channelRes.ok) {
            throw new Error(`Unable to get channel info for channel ${channelId}; api status: ${channelRes.status}; body: ${await channelRes.text()}`);
        }
        const channelInfo: Channel = await channelRes.json();

        const guildRes = await fetch(`https://discord.com/api/v9/guilds/${channelInfo.guild_id}`, {
            method: "GET",
            headers: this.headers,
        })
        if (!guildRes.ok) {
            throw new Error(`Unable to get guild info for guild ${channelInfo.guild_id}; api status: ${channelRes.status}; body: ${await channelRes.text()}`);
        }
        channelInfo.guild_name = (await guildRes.json())["name"];

        return channelInfo
    }

    static generateSnowflake() {
        return ((BigInt(Date.now().valueOf()) - BigInt(1420070400000)) << BigInt(22)).toString();
    }

}