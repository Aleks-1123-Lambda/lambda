const chalk = require("chalk");
const moment = require("moment");
const errors = require("../errors");
module.exports.log = (content, type = "log") => {
  const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
  switch (type) {
    case "log": {
      return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
    }
    case "warn": {
      return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
    }
    case "error": {
      return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
    }
    case "debug": {
      return console.log(`${timestamp} ${chalk.bgGreen(type.toUpperCase())} ${content} `);
    }
    case "cmd": {
      return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
    }
    case "ready": {
      return console.log(`${timestamp} ${chalk.black.bgCyan(type.toUpperCase())} ${content}`);
	}
	case "initialize": {
		return console.log(`${timestamp} ${chalk.black.bgMagenta(type.toUpperCase())} ${content}`)
	}
    default: throw new errors.LoggerError("Logger type must be either warn, debug, log, ready, cmd or error.");
  }
}; 

module.exports.error = (...args) => this.log(...args, "error");

module.exports.warn = (...args) => this.log(...args, "warn");

module.exports.debug = (...args) => this.log(...args, "debug");

module.exports.cmd = (...args) => this.log(...args, "cmd");

module.exports.initialize = (...args) => this.log(...args, "initialize");

module.exports.ready = (...args) => this.log(...args, "ready");