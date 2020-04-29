import winston from 'winston';
import appRoot from 'app-root-path';
import 'winston-daily-rotate-file';
import { getNamespace } from 'continuation-local-storage';

const options = {
  rotate: {
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD_HH',
    maxSize: '1m',
    maxFiles: '14d',
  },
  file: {
    level: 'info',
    filename: 'app.log',
    dirname: `${appRoot}/logs/`,
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  },
  error: {
    level: 'error',
    filename: 'app.log',
    dirname: `${appRoot}/logs/`,
    handleExceptions: true,
    json: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  },
  console: {
    level: 'info',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
    prettyPrint: true,
    colorize: process.stdout.isTTY,
  },
};

const Logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile(options.rotate),
    new winston.transports.File(options.error),
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

const formatMessage = (message: string) => {
  const namespace = getNamespace('request');
  const id = namespace && namespace.get('id');
  return id ? `[${id}] ${message}` : message
}

const logger = {
  log: (message: string): winston.Logger => Logger.info(message),
  info: (message: string, obj?: object): winston.Logger => Logger.info(formatMessage(message), obj),
  error: (message: string, obj?: object): winston.Logger => Logger.error(formatMessage(message), obj),
  warn: (message: string, obj?: object): winston.Logger => Logger.warn(formatMessage(message), obj),
  debug: (message: string, obj?: object): winston.Logger => Logger.debug(formatMessage(message), obj),
  silly: (message: string, obj?: object): winston.Logger => Logger.silly(formatMessage(message), obj),
}
export default logger;
