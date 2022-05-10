import { createLogger, format, transports } from 'winston';

const logger = (file) => {
  const myFormat = format.printf(({ timestamp, level, message, meta }) => `${timestamp} | ${level} | ${message};${meta ? JSON.stringify(meta) : ''}`);
  return createLogger({
    transports: [
      new transports.Console({
        filename: file,
        level: 'info',
        format: format.combine(format.timestamp(), format.splat(), myFormat),
      }),
      new transports.File({
        filename: file,
        level: 'info',
        format: format.combine(format.timestamp(), format.splat(), myFormat),
      }),
    ],
  });
};

export { logger };
