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
npx mgc-cli create
```

**Result:**
Projects that is listed in **config.json** will be cloned from GIT into folder **./projects**

## Advanced

You can customize the location for projects:

```
npx mgc-cli create --src=repos
```

**Result:**
Projects that is listed in **config.json** will be cloned from GIT into specific folder **./repos**

You can customize the config file for projects and source for projects to be cloned:

```
npx mgc-cli create --src=repos --config=list.json
```

# Update all projects from GIT to local:

To update all projects with latest change - navigate to folder where **config.json** located:

```
npx mgc-cli update
```
