import {CronJob} from "cron";
import {AUTHORIZATION, CHANNEL_ID, CRON} from "./config/env";
import logger from "./config/log-config";
import {API} from "./discord/api";

let api: API

async function main() {
    api = await API.init(AUTHORIZATION, CHANNEL_ID)
    const job = CronJob.from({
        cronTime: CRON || "",
        onTick: runJob,
        timeZone: "America/Sao_Paulo"
    })
    job.start()
    logger.info(`Started prayer 🙏 for channel '${api.channel?.name}' in guild '${api.channel?.guild_name}'`)
}

async function runJob() {
    const response = await api.sendPrayer();
    if (response.status >= 300 || response.status < 200) {
        logger.error(`status: ${response.status}; body: ${await response.text()}`, )
    } else {
        logger.info("🙏")
    }
}

main()