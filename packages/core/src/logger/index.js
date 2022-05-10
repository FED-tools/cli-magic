import { createLogger, format, transports, addColors } from 'winston';

const logger = (file) => {
  const myFormat = format.printf(({ timestamp, level, message }) => `${timestamp} | ${level} | ${message}`);
  addColors({
    info: 'bold yellow',
  });
  const customFormat = format.combine(
    format.colorize({
      all: true,
    }),
    format.timestamp(),
    format.splat(),
    myFormat,
  );
  return createLogger({
    transports: [
      new transports.Console({
        filename: file,
        level: 'info',
        format: customFormat,
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
