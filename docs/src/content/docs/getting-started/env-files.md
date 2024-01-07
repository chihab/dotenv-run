---
title: .env files
---

A .env file is a simple text file that stores environment variables. Environment variables are key-value pairs that are used to configure applications and services. They can be used to store things like database passwords, API keys, and other sensitive information.

.env files are typically located in the root directory of a project. They are ignored by version control systems, so you can store sensitive information in them without worrying about it being exposed.

To use a .env file, you need to load it into your application's environment. There are a number of ways to do this, depending on the programming language and framework you are using.

Here is an example of a .env file:

```
DATABASE_URL=postgres://user:password@localhost:5432/my_database
API_KEY=1234567890
```

This file defines two environment variables:

* DATABASE_URL: The URL of the database server
* API_KEY: The API key for a third-party service

.env files are a convenient way to store environment variables. They are easy to use and secure, making them a valuable tool for developers.

Here are some additional things to keep in mind when using .env files:

* Use a consistent naming convention for your environment variables. This will make it easier to find and manage them.
* Use comments in your .env file to document what each variable is used for. This will be helpful for future developers who need to work on your project.
* Don't commit your .env file to version control. This will help to keep your sensitive information secure.