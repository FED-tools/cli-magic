# MGCT - MaGiC Tool

[![Codacy Badge](https://img.shields.io/codacy/coverage/d5c10d44cd184248947aa0e615414f94)](https://www.codacy.com/gh/FED-tools/cli-magic/dashboard?utm_source=github.com&utm_medium=referral&utm_content=FED-tools/cli-magic&utm_campaign=Badge_Coverage)

Magic that will help you with managing repositories.

Set of tools that helps to roll out and maintain GIT repositories of your project or company extremely fast.

## Clone all projects from GIT to local

Create file config.json

```json
[
  {
    "project": "React",
    "repo": "git@github.com:facebook/react.git",
    "path": "lib/react"
  }
]
```

Then run command in the folder where you have **config.json**

```bash
npx mgct create
```

**Result:**
Projects that is listed in **config.json** will be cloned from GIT into folder **./projects**

## Update all projects from GIT to local

To update all projects with latest change - navigate to folder where **config.json** located:

```bash
npx mgct update
```

## Show list of commits

```bash
npx mgct commits
```

### Advanced

You can customize the location for projects:

```bash
npx mgct create --src=repos
```

**Result:**
Projects that is listed in **config.json** will be cloned from GIT into specific folder **./repos**

You can customize the config file for projects and source for projects to be cloned:

```bash
npx mgct create --src=repos --config=list.json
```

## Copy/Paste for checking after deployment

```bash
# Step 1 - (Remove previous files)
rm -rf ~/Desktop/projects
rm -rf ~/Desktop/config.json
cd ~/Desktop
# Step 2 - (Generate Config)
echo "[{\"project\": \"Bootstrap\", \"repo\": \"git@github.com:twbs/bootstrap.git\", \"path\": \"bootstrap\"}]" > ./config.json
# Step 3 - (Optionally for cleaning npx cache)
npx clear-npx-cache
npx mgct create
# Step 4 - (Pull GIT projects)
npx mgct update
# Step 5 - (See commits list)
npx mgct commits
```

In root folder for this project you can find config.json file. Use that.
Navigate to folder in CLI

npx nx graph