import exec from 'await-exec';

async function getStats({ authorName, period }, path, repo) {
  const commitsSeparator = '\n\n\n';
  const dev = ' ~/~';
  const pretty = ` --pretty="%n%n %s ${dev} %H ${dev} %an ${dev} %ct ${dev}" --first-parent`;

  /*
  --author="Artem Deikun|Mohit Parashar
  */
  const author = authorName !== 'all' ? ` --author="${authorName}"` : '';
  /*
  --since="last 7 days"
  */
  const date = ` --since="${period}" `;

  /*
  cd
    projects/katapult/ng-zibby &&
  git log --all
    --pretty=format:"%n%n %s~/~%H~/~%an~/~%ct~/~"
    --since="last 7 days"
    --author="Artem Deikun|Mohit Parashar"
    --shortstat
  */

  const execStr = `cd ${path} && git log --all ${pretty} ${date} ${author} --shortstat`;
  const output = await exec(execStr);
  const commitsList = output.stdout.trim().split(commitsSeparator);

  const generalCommit = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const commit of commitsList) {
    // eslint-disable-next-line no-shadow
    const [message, hash, authorName, date, summary] = commit.split(dev);

    const commitDate = +new Date(date * 1000);
    const commitDay = new Date(+commitDate).setHours(0, 0, 0, 0);

    generalCommit.push({
      message: message.replace(/\n/g, '').trim(),
      hash,
      authorName: authorName.trim(),
      commitDate,
      commitDay,
      repo,
      summary: summary.replace(/\n/g, '').trim(),
    });
  }

  return generalCommit;
}

const commits = async ({ list, log, author, period, path }) => {
  let count = 0;
  // eslint-disable-next-line no-shadow
  const commits = [];
  if (log) {
    log(`Commits for (${list.length}) projects`);
  }
  // eslint-disable-next-line no-restricted-syntax
  for await (const el of list) {
    // eslint-disable-next-line no-plusplus
    count++;
    const commitsLog = await getStats(
      {
        authorName: author, // if 'all' - show all
        period: period, // for example 'last 7 days'
      },
      `${path}/${el.path}`,
      el,
    );
    console.log(commitsLog);
  }
  return {
    count,
    commits,
  };
};

export { commits };

// Sample:
// commits({
//   list: [
//     {
//       "project": "React",
//       "repo": "git@github.com:facebook/react.git",
//       "path": "react"
//     }
//   ],
//   author: 'all',
//   period: 'last 7 days'
// });