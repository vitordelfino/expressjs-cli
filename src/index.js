#!/usr/bin/env node
const program = require('commander');
const shell = require('shelljs');
const pkg = require('../package.json');
const figlet = require('figlet');
const chalk = require('chalk')
const inquirer = require('inquirer');
const devDependencies = require('./artifacts/devdependencies.json')
const dependencies = require('./artifacts/dependencies.json')
const fs = require('fs');

program.version(pkg.version);

program.command('start <project_name>')
  .description('Express project boilerplate')
  .action((project_name) => {
    console.log(chalk.cyanBright(figlet.textSync('EXPRESS-CLI')))
    const mainPath = process.cwd();
    shell.mkdir(`${mainPath}/${project_name}`);
    shell.cd(`${mainPath}/${project_name}`)
      .exec('npm init -y')

    shell.exec('git init')
    async function answer() {

      const { executor } = await inquirer.prompt(
        [
          {
            type: 'list',
            name: 'executor',
            message: 'Select one executor',
            choices: ['npm', 'yarn']
          }
        ]
      )
      console.log(chalk.green('Installing dev dependencies...'))
      shell.exec(`${executor} add -D --silent ${devDependencies.join(' ')}`)

      console.log(chalk.green('Installing dependencies...'))
      shell.exec(`${executor} add --silent ${dependencies.join(' ')}`)

      console.log(chalk.green('Configuring commitizen...'))
      shell.exec(`npx commitizen init cz-conventional-changelog ${executor} --dev --exact --silent`)

      console.log(chalk.green(`Configuring commitlint...`))
      shell.exec(`echo module.exports = { extends: ['@commitlint/config-conventional'], "commit-msg": "commitlint -E HUSKY_GIT_PARAMS" }; > commitlint.config.js`)

      console.log(chalk.green('Configuring files'))
      shell.cp('-R', [`${__dirname}/artifacts/project/*`, `${__dirname}/artifacts/project/.*`], `${mainPath}/${project_name}`)
      const json = require(`${mainPath}/${project_name}/package.json`)
      json.husky = {
        hooks: {
          "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
          "pre-commit": "npm test",
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        }
      }
      json.scripts = {
        "test": "NODE_ENV=test jest --detectOpenHandles --forceExit --verbose",
        "build": "rimraf dist && rimraf artifact && tsc -b && cp .env* dist",
        "start:dev": "NODE_ENV=development nodemon --config nodemon.json",
        "start": "NODE_ENV=development ts-node src/server.ts"
      }
      fs.writeFileSync(`${mainPath}/${project_name}/package.json`, JSON.stringify(json), 'utf-8')

      console.log(chalk.green('Process finished...'))
      if (executor === 'yarn') {
        console.log(
          chalk.cyan('Run'),
          chalk.green(`cd ${project_name} and yarn start:dev`),
          chalk.cyan('to initialize application')
        )
      } else {
        console.log(
          chalk.cyan('Run'),
          chalk.green(`cd ${project_name} and npm run start:dev`),
          chalk.cyan('to initialize application')
        )
      }

    }
    answer();

  });

program.parse(process.argv);