import { clone, pull, commits } from '@mgct/core';
import init from './logic';

jest.mock('@mgct/core', () => ( {
    clone: jest.fn(() => Promise.resolve({ count: 1, repos: [] })),
    pull: jest.fn(() => Promise.resolve({ count: 1, repos: [] })),
    commits: jest.fn(() => Promise.resolve({ count: 1, repos: [] })),
  })
);

test('Clone on Create Should Be Executed', async () => {
  await init('create');
  expect(clone).toHaveBeenCalled();
});

test('Pull on Update Should Be Executed', async () => {
  await init('update');
  expect(pull).toHaveBeenCalled();
});

test('Commits list on Commits Should Be Executed', async () => {
  await init('commits');
  expect(commits).toHaveBeenCalled();
});

test('Nothing should break', async () => {
  await init();
});

// test('Test Update', async () => {
//   await init('update');
// });
// test('Test Commits', async () => {
//   await init('commits');
// });
// test('Test Wrong Command', async () => {
//   await init();
// });
