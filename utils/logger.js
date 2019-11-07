const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
	winston.format.timestamp({
		format: 'YYYY-MM-DD HH:mm:ss'
	}),
	winston.format.align(),
	winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
	format: logFormat,
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'system.log') })
	]
});

module.exports = logger;
