import yargs from 'yargs/yargs';
import getCommandsCli from '../helpers/getCommandsCli';
import getFileRelativeToCli from '../helpers/getFilePathRelativeToCli';

interface OptProps {
  [key: string]: { default: string };
}

// https://github.com/yargs/yargs/blob/main/docs/typescript.md
export default (opt: OptProps) => {
  const argv = yargs(getCommandsCli()).options(opt).parseSync();
  const actionCommand = argv._[0];

  const pathToConfig = getFileRelativeToCli(argv.config);
  const pathToLog = getFileRelativeToCli(argv.log);
  const projectsDistPath = getFileRelativeToCli(argv.src);

  return {
    actionCommand,
    pathToConfig,
    pathToLog,
    projectsDistPath,
    inputArguments: argv,
  };
};
