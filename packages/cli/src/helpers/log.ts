import { Logger } from 'winston';
import { logger } from '@mgct/core';

const logs =
  (pathToLog: string) =>
  (text: string): Logger =>
    logger(pathToLog).log('info', text);
export default logs;
