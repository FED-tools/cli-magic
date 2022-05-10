import exec from 'await-exec';
import fs from 'fs';

const clone = async ({ list, path, log }) => {
  let countRepos = 0;
  let clonedRepos = [];
  log(`Cloning all repositories (${list.length})`);
  for await (let el of list) {
    const pathCurrent = `${path}/${el.path}`;
    log(`Start cloning: (${++countRepos}/${list.length}) ${el.repo} : `);
    try {
      fs.accessSync(pathCurrent, fs.constants.F_OK);
      log(`Repository already exists: ${pathCurrent}`);
    } catch (err) {
      const command = `git clone ${el.repo} ${pathCurrent}`;
      log('> ' + command);
      await exec(command);
      log(`Repository has been cloned: ${el.repo}`);
      clonedRepos.push(el.repo);
    }
  }
  log(`Done cloning all repositories`);
  return {
    count: countRepos,
    repos: clonedRepos,
  };
};

export { clone };
