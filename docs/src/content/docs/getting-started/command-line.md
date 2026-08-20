---
title: Command Line
description: Override .env values from the command line and pass environment variables to any command with dotenv-run.
---

Defining environment variables can vary between OSes. It’s also important to know that this manner is temporary for the life of the shell session.


## Windows (cmd.exe)

```cmd
set "API_URL=abcdef" && dotenv-run -- npm start
```

(Note: Quotes around the variable assignment are required to avoid a trailing whitespace.)

## Windows (Powershell)

```powershell
($env:API_URL = "abcdef") -and (dotenv-run -- npm start)
```

## Linux, macOS (Bash)

```sh
API_URL=abcdef dotenv-run -- npm start
```