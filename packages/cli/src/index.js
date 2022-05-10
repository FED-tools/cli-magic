#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { logger, clone, pull } from '@mgct/core';
import { readFile } from 'fs/promises';

const { argv } = yargs(hideBin(process.argv)).demandCommand(1, 'You need at least one command before moving on');

const pathToConfig = `${process.cwd()}/${argv.config || 'config.json'}`;
const pathToLog = `${process.cwd()}/${argv.log || 'history.log'}`;
const pathToProjects = `${process.cwd()}/${argv.src || 'projects'}`;

const log = (text) => logger(pathToLog).log('info', text);

readFile(new URL(pathToConfig, import.meta.url)).then((jsonFile) => {
  const configAllProjects = JSON.parse(jsonFile);
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
  } else {
    // eslint-disable-next-line no-console
    console.log('Wrong Command');
  }
});
