import exec from 'await-exec-typescript';
import * as fs from 'fs';
import {TItemRepo} from '../index';

type TCloneProps = {
  list: TItemRepo[];
  path: string;
  log: (message: string) => void;
};

const clone = async ({ list, path, log }:TCloneProps):Promise<{count: number, repos: TItemRepo[]}> => {
  let countRepos = 0;
  const clonedRepos = [];
  log(`Cloning all repositories (${list.length})`);
  // eslint-disable-next-line no-restricted-syntax
  for await (const el of list) {
    const pathCurrent = `${path}/${el.path}`;
    // eslint-disable-next-line no-plusplus
    log(`Start cloning: (${++countRepos}/${list.length}) ${el.repo}`);
    try {
      fs.accessSync(pathCurrent, fs.constants.F_OK);
      log(`Repository already exists: ${pathCurrent}`);
    } catch (err) {
      const command = `git clone ${el.repo} ${pathCurrent}`;
      log(`> ${command}`);
      await exec(command);
      log(`Repository has been cloned: ${el.repo}`);
      clonedRepos.push(el);
    }
  }
  log('Done cloning all repositories');
  return {
    count: countRepos,
    repos: clonedRepos,
  };
};

export { clone };
