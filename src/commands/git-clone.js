import exec from 'await-exec';
import fs from 'fs';

const clone = async ({ list, path, log }) => {
  let countRepos = 0;
  log(`Cloning all repositories (${list.length})`);
  for await (let repo of list) {
    const pathCurrent = `${path}/${repo.path}`;
    log(`Start cloning: (${++countRepos}/${list.length}) ${repo.repo} : `);
    try {
      fs.accessSync(pathCurrent, fs.constants.F_OK);
      log(`Repository already exists: ${pathCurrent}`);
    } catch (err) {
      const command = `git clone ${repo.repo} ${pathCurrent}`;
      log('> ' + command);
      await exec(command);
      log(`Repository has been cloned: ${repo.repo}`);
      log(`Repository already exists here: ${pathCurrent}`);
    }
  }
  log(`Done cloning all repositories`);
  return list;
};

export { clone };
