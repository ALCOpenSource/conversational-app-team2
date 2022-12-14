const winston = require("winston");
const path = require("path");
const fs = require("fs");
//import { fileURLToPath } from "url"
// const fileURLToPath = require("url");

const timestamp = new Date(Date.now()).toLocaleString("en-us", {
  timeZone: "Africa/Nairobi",
});
const customFormat = winston.format.combine(
  winston.format.printf((info) => {
    return `${timestamp} [${info.level.toUpperCase().padEnd(0)}]: ${
      info.message
    }`;
  })
);
exports.logger = winston.createLogger({
  format: customFormat,
  transports: [
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "./logs/info.log", level: "info" }),
  ],
});

// const __filename = fileURLToPath(meta.url);
// __dirname = path.dirname(__filename);
exports.httpLogStream = fs.createWriteStream(
  path.join(__dirname, "../", "logs", "http_logs.log")
);
