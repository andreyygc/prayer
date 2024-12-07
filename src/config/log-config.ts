import winston from "winston";

const customFormat = winston.format.printf(({timestamp, level, message, logger}) => {
    const paddedLevel = level.toUpperCase().padEnd(5);
    return `${timestamp} ${paddedLevel} :: ${message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYYTHH:mm:ss.SSSZ' }),
        customFormat
    ),
});

logger.add(new winston.transports.Console());

export default logger