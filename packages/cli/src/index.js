#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { logger, clone } from '@mgct/core';
import { readFile } from 'fs/promises';

const { argv } = yargs(hideBin(process.argv)).demandCommand(1, 'You need at least one command before moving on');

const pathToConfig = `${process.cwd()}/${argv.config || 'config.json'}`;
const pathToLog = `${process.cwd()}/${argv.log || 'history.log'}`;
const pathToProjects = `${process.cwd()}/${argv.src || 'projects'}`;

readFile(new URL(pathToConfig, import.meta.url)).then((jsonFile) => {
  if (argv._[0] === 'create') {
    const configAllProjects = JSON.parse(jsonFile);
    const log = (text) => {
      if (argv.log) {
        logger(pathToLog).log('info', text);
      }
    };
    clone({
      list: configAllProjects,
      path: pathToProjects,
      log,
    });
  } else {
    // eslint-disable-next-line no-console
    console.log('Wrong Command');
  }
});
