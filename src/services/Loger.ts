import { getLogger, configure, levels } from 'log4js'

configure({
    appenders: {
        // app: { type: "file", filename: "app.log" },
        out: {type: 'stdout'}
    },
    categories: {
        default: {
            appenders: ["out"],
            level: 'trace'
        }
    }
});

export const logger = getLogger();
// logger.trace("Entering cheese testing");
// logger.debug("Got cheese.");
// logger.info("Cheese is Comté.");
// logger.warn("Cheese is quite smelly.");
// logger.error("Cheese is too ripe!");
// logger.fatal("Cheese was breeding ground for listeria.");