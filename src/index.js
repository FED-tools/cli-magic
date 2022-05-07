#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { logger } from './logger/index.js';
import { clone } from './commands/git-clone.js';
import { readFile } from 'fs/promises';

const argv = yargs(hideBin(process.argv));

const pathToConfig = process.cwd() + '/' + argv.argv.config;
const pathToLog = process.cwd() + '/' + argv.argv.log;
const pathToProjects = process.cwd() + '/' + argv.argv.src;

readFile(new URL(pathToConfig, import.meta.url)).then(jsonFile => {
  const configAllProjects = JSON.parse(jsonFile);

  const log = text => {
    if (argv.argv.log) {
      logger(pathToLog).log('info', text);
    }
  };

  clone({
    list: configAllProjects,
    path: pathToProjects,
    log,
  });
});
