import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

function getEnv(key: string): string {
    const value = process.env[key]
    if (!value) {
        throw new Error(`Environment variable ${key} required`)
    }
    return value;
}

export const CHANNEL_ID = getEnv("CHANNEL_ID")
export const AUTHORIZATION = getEnv("AUTHORIZATION")
export const CRON = getEnv("CRON")