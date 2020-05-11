[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![PIPELINE](https://github.com/vitordelfino/expressjs-cli/workflows/PIPELINE/badge.svg?branch=master&event=push)
![](https://img.shields.io/github/last-commit/vitordelfino/expressjs-cli/master)
![](https://img.shields.io/github/issues/vitordelfino/expressjs-cli/master)
![](https://img.shields.io/npm/dt/expressjs-cli)
![](https://img.shields.io/npm/v/expressjs-cli)
![](https://img.shields.io/github/package-json/keywords/vitordelfino/expressjs-cli)

# ExpressJs CLI (Project in progress)

A CLI to create a nodejs project pre configured

## Techs

- Express
- Typescript
- Jest
- ESLint
- Babel
- Commitizen
- Husky

## How to use

> Install package globally

```bash
yarn add --global expressjs-cli
or
npm i -g expressjs-cli
```

> Run command to create a project

```bash
expressjs-cli start <project name>
```

## Configuring after generate project

You can rename all folders, files, contents that obtain "Replace" text;

- src/apps/Replace (all files)
- src/config/db/standart.connection.ts

Update env files with DATABASE_URL, example below.

`.env | .env.development | .env.test`

```auto
  DATABASE_URL=mongodb+srv://<username>:<password>@<host>/<database>?retryWrites=true&w=majority
```

## Generate new CRUD

> Run command in root path (near package.json)

```bash
expressjs-cli crud <Model | Entity>
```

![Terminal log](./crud.png)

Command will generate a new module in `src/apps` folder with:

- Route
- Validator
- Controller
- Service
- Crud tests

After run command updates some files;

- `src/routes.ts`: import new routes from module and configure the path
- `src/config/db/standart.connection.ts`: add new Entity on Typeorm connection

---

## Informations

Some infos about created project.

### Structure

![Project Structure](./project_structure.png)

### How to throw Errors

![Throws error](./throws.svg)

### How to use logger

![Logger](./logger.svg)

### Use Yup or class-validator to validate models

- Always import "express-async-errors" when use middlewares in your routes

![route.ts](./route.svg)

![Hello.ts](./hello-model.svg)

![HelloValidator.ts](./validation-middleware.svg)

---

## Run tests

```bash
yarn test
or
npm run test
```
