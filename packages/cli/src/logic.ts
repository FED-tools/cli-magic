#!/usr/bin/env node

import { clone, pull, commits } from '@mgct/core';
import * as fs from 'fs';
import { opt } from './configs/options';
import log from './helpers/log';
import parseCli from './yargs/parseCli';

export default async function init(aaa?: string) {
  const { actionCommand = aaa, inputArguments, pathToConfig, pathToLog, projectsDistPath } = parseCli(opt);
  const projectsList = JSON.parse(String(fs.readFileSync(pathToConfig)));

  if (actionCommand === 'create') {
    return await clone({
      list: projectsList,
      path: projectsDistPath,
      log: log(pathToLog),
    });
  } else if (actionCommand === 'update') {
    return await pull({
      list: projectsList,
      path: projectsDistPath,
      log: log(pathToLog),
    });
  } else if (actionCommand === 'commits') {
    const commitsList = await commits({
      list: projectsList,
      path: projectsDistPath,
      author: inputArguments.user,
      period: inputArguments.period,
      log: log(pathToLog),
    });
    // eslint-disable-next-line no-console
    console.log(commitsList);
    return commitsList;
  } else {
    // eslint-disable-next-line no-console
    console.log('Wrong Command');
  }
}
