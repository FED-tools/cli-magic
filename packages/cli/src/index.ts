#!/usr/bin/env node

import yargs from 'yargs';
import { logger, clone, pull, commits } from '@mgct/core';
import { readFile } from 'fs/promises';

const parser = yargs(process.argv.slice(2)).options({
  config: { type: 'string', default: 'config.json' },
  src: { type: 'string', default: 'history.log' },
  log: { type: 'string', default: 'history.log' },
  user: { type: 'string', default: 'all' },
  period: { type: 'string', default: 'last 5 days' },
});

(async () => {
  // https://github.com/yargs/yargs/blob/main/docs/typescript.md
  const argv = await parser.argv;
  const pathToConfig = `${process.cwd()}/${argv.config || 'config.json'}`;
  const pathToLog = `${process.cwd()}/${argv.log || 'history.log'}`;
  const pathToProjects = `${process.cwd()}/${argv.src || 'projects'}`;

  const log = (text: string) => logger(pathToLog).log('info', text);

  readFile(new URL(pathToConfig, import.meta.url)).then((jsonFile) => {
    const configAllProjects = JSON.parse(String(jsonFile));
    if (argv._[0] === 'create') {
      clone({
        list: configAllProjects,
        path: pathToProjects,
        log,
      });
    } else if (argv._[0] === 'update') {
      pull({
        list: configAllProjects,
        path: pathToProjects,
        log,
      });
    } else if (argv._[0] === 'weekly-status') {
      const commitsList = commits({
        list: configAllProjects,
        path: pathToProjects,
        author: argv.user,        
        period: argv.period,
        log,
      });
      commitsList.then((list) => {
        // eslint-disable-next-line no-console
        console.log(list);
      });
    } else if (argv._[0] === 'commits') {
      const commitsList = commits({
        list: configAllProjects,
        path: pathToProjects,
        author: argv.user || 'all',
        period: argv.period || 'last 7 days',
        log,
      });
      // eslint-disable-next-line no-console
      commitsList.then((el) => console.log(el));
    } else {
      // eslint-disable-next-line no-console
      console.log('Wrong Command');
    }
  });
})();
