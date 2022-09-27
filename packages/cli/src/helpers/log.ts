import { logger } from '@mgct/core';

const log = (pathToLog: string) => (text: string) => logger(pathToLog).log('info', text);
export default log;
