/* eslint-disable quotes */
import exec from 'await-exec-typescript';
import { TItemRepo } from '..';

type TGitRequestedValues = {
  authorName: 'all' | string;
  period: string;
};

type TGitResponse = {
  message: string;
  hash: string;
  authorName: string;
  commitDate: number;
  commitDay: number;
  email: string;
  dateUnix: string;
  relativeDate: string;
  ref: string;
  repo: TRepo;
  summary: string;
};

type TPath = string;
type TRepo = string;

async function getStats(
  { authorName, period }: TGitRequestedValues,
  path: TPath,
  repo: TRepo,
): Promise<TGitResponse[]> {
  // This section is for special helpers we need to parse output from git status
  const commitsSeparator = '\n\n\n';
  const dev = ' ~/~ ';
  const arrayForPretty = [
    '%s', // new lines and subject
    '%H', // subject
    '%an', // author name
    '%ct', // committer date, UNIX timestamp
    '%ae', // author email
    '%at', // author date, UNIX timestamp
    '%ar', // author date, relative
    '%d', // commit notes
  ];
  const str = arrayForPretty.join(dev);
  const pretty = ` --pretty="%n%n ${str} ${dev}" --first-parent`;

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
  let commitsList: string[] = [];

  if (output.stdout) {
    commitsList = output.stdout.trim().split(commitsSeparator);
  }

  const generalCommit: TGitResponse[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for await (const commit of commitsList) {
    // eslint-disable-next-line no-shadow, max-len
    const [message, hash, authorName, date, email, dateUnix, relativeDate, ref, summary] = commit.split(dev);

    const commitDate = +new Date(Number(date) * 1000);
    const commitDay = new Date(Number(commitDate)).setHours(0, 0, 0, 0);

    // https://git-scm.com/docs/pretty-formats
    generalCommit.push({
      message: message.replace(/\n/g, '').trim(),
      hash,
      authorName: authorName.trim(),
      commitDate,
      commitDay,
      email,
      dateUnix: dateUnix.trim(),
      relativeDate: relativeDate.trim(),
      ref: ref.trim(),
      repo,
      summary: summary.replace(/\n/g, '').trim(),
    });
  }

  return generalCommit;
}

type TCommits = {
  list: TItemRepo[];
  log: (message: string) => void;
  path: string;
  period: string;
  author: 'all' | string;
  output: (data: TGitResponse[] | string) => void;
};

export const commits = async ({ list, log, author, period, path, output }: TCommits) => {
  let commitsInfo: TGitResponse[] = [];
  if (log) {
    log(`Commits for (${list.length}) projects`);
  }
  // eslint-disable-next-line no-restricted-syntax
  for await (const item of list) {
    const info = await getStats(
      {
        authorName: author, // if 'all' - show all
        period, // for example 'last 7 days'
      },
      `${path}/${item.path}`,
      item.repo,
    );
    if (info.length) {
      commitsInfo = [...commitsInfo, ...info];
    }
  }

  if (output) {
    output(commitsInfo);
  }

  return commitsInfo;
};
