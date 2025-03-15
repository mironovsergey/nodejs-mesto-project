import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

// Логер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/request-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      zippedArchive: true,
      maxFiles: 14,
    }),
  ],
  format: winston.format.json(),
});

// Логер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      zippedArchive: true,
      maxFiles: 14,
    }),
  ],
  format: winston.format.json(),
});
