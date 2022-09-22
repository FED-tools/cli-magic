import exec from 'await-exec-typescript';
import { TItemRepo } from '..';

type TPullProps = {
  list: TItemRepo[];
  path: string;
  log: (message: string) => void;
};

const pull = async ({ list, log, path }: TPullProps) => {
  let countRepos = 0;
  const clonedRepos = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const el of list) {
    // eslint-disable-next-line no-plusplus
    log(`Start Updating: (${++countRepos}/${list.length}) ${el.repo} : `);
    const command = `cd ${path}/${el.path} && git fetch --all`;
    await exec(command);
    log(`Repository has been updated: ${el.repo}`);
    clonedRepos.push(el.repo);
  }
  log('Done updating all repositories');
  return {
    count: countRepos,
    repos: clonedRepos,
  };
};

export { pull };
