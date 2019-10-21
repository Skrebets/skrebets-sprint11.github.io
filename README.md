# skrebets-sprint11.github.io

*version 0.0.6*

## Link

https://Skrebets.github.io/skrebets-sprint11.github.io/

## Description

This project is created to learn how to build projects by using webpack.

Startkit of this project is a website, which was created in 9th sprint.

## How to create

To see how to create this project sign in to https://praktikum.yandex.ru and follow the link:

https://praktikum.yandex.ru/learn/frontend-developer/courses/17226a23-8fe2-4d1e-b550-56eacf5d32a2/sprints/497/topics/ac843b35-98a8-48d6-9970-ef20b3c3b26e/lessons/d52a1312-0fb8-4bf8-8a59-568f63770b69/

## How to build

There are 3 kind of builds:

**1. Production** - project's final version which would be on server.

Starts with **npm run build** command. Creates **dist** directory which containes output files.

*package.json*

"scripts": { "build": "webpack --mode production" }

**2. Development** - for project development. Should work with local server.

Starts with **npm run dev** command. Open builded website on local server.

*package.json*

"scripts": { "dev": "webpack-dev-server --mode development --open" }

**3. Deploy** - for publishing website on gh-pages.

Starts with **npm run deploy** command. After this it become able to follow website by the link, which has been written in "homepage" field in package.json.

*package.json*

"scripts": { "deploy": "gh-pages -d dist" }, { "name": "...", "homepage": "https://Skrebets.github.io/skrebets-sprint11.github.io/", "version": "...", "description": "..." }

**WARNING**
gh-pages must be installed!

*npm install gh-pages --save-dev*

## Technologies

A list of technologies which are used in project:

1. HTML5,
2. CSS3,
3. JavaScript,
4. GIT,
5. Webpack.