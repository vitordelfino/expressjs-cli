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

---

## Informations

Some infos about created project.

### Structure

![Project Structure](./project_structure.png)

### How to throw Errors

![Throws error](./throws.svg)

### How to use logger

![Logger](./logger.svg)

---

## Run tests

```bash
yarn test
or
npm run test
```
