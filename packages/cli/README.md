# MGCT - MaGiC Tool

Magic that will help you with managing repositories.

Set of tools that helps to roll out and maintain GIT repositories of your project or company extremely fast.

# Clone all projects from GIT to local:

Create file config.json

```
[
  {
    "project": "React",
    "repo": "git@github.com:facebook/react.git",
    "path": "lib/react"
  }
]
```

Then run command in the folder where you have **config.json**

```
npx mgct create
```

**Result:**
Projects that is listed in **config.json** will be cloned from GIT into folder **./projects**

# Update all projects from GIT to local:

To update all projects with latest change - navigate to folder where **config.json** located:

```
npx mgct update
```

# Show list of commits:

```
npx mgct commits
```

## Advanced

You can customize the location for projects:

```
npx mgct create --src=repos
```

**Result:**
Projects that is listed in **config.json** will be cloned from GIT into specific folder **./repos**

You can customize the config file for projects and source for projects to be cloned:

```
npx mgct create --src=repos --config=list.json
```

# Copy/Paste for checking after deployment

```
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
