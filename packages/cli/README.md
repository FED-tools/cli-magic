# mgct - Magic Tool

## Command to Clone all projects from config.json list into projects folder:

```
npx mgc-cli --config=config.json --log=log.log --src=projects
```

## config.json

```
[
  {
    "project": "React",
    "repo": "git@github.com:facebook/react.git",
    "path": "lib/react"
  }
]
```
