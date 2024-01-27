"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamUtil = void 0;
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const streamUtil = {
    write: (message) => {
        console.info(message.substring(0, message.lastIndexOf('\n')));
    },
};
exports.streamUtil = streamUtil;
