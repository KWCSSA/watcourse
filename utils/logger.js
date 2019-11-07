const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
	winston.format.timestamp({
		format: 'YYYY-MM-DD HH:mm:ss'
	}),
	winston.format.align(),
	winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

transports = [ new winston.transports.Console() ];
if (process.env.NODE_ENV === 'production') {
	transports.push(new winston.transports.File({ filename: path.join(__dirname, '..', 'logs', 'system.log') }));
}

const logger = winston.createLogger({
	format: logFormat,
	transports
});

module.exports = logger;
