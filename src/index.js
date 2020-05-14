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
const path = require('path');

program.version(pkg.version);

program.command('start <project_name>')
  .description('Express project boilerplate')
  .action((project_name) => {
    console.log(chalk.cyanBright(figlet.textSync('EXPRESSJS-CLI')))
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
      shell.exec(`${executor} add -D ${devDependencies.join(' ')}`)

      console.log(chalk.green('Installing dependencies...'))
      shell.exec(`${executor} add ${dependencies.join(' ')}`)

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
      json.resolutions = {
        tslib: "1.11.2"
      }
      json.dependencies = {
        ...json.dependencies,
        tslib: "1.11.2"
      }
      json.scripts = {
        "test": "NODE_ENV=test jest --detectOpenHandles --forceExit --verbose",
        "build": "rimraf dist && rimraf artifact && tsc -b && cp .env* dist",
        "start:dev": "NODE_ENV=development nodemon --config nodemon.json",
        "start": "NODE_ENV=development ts-node src/server.ts",
        "coverage": "NODE_ENV=test rimraf coverage && jest --coverage --silent --detectOpenHandles --forceExit"
      }
      fs.writeFileSync(`${mainPath}/${project_name}/package.json`, JSON.stringify(json), 'utf-8')
      shell.exec("rm -rf node_modules yarn.lock package-lock.json")
      if (executor === 'yarn') {
        shell.exec('yarn')
        console.log(
          chalk.cyan('Run'),
          chalk.green(`cd`),
          chalk.blueBright(project_name),
          chalk.green(`anfsd`),
          chalk.cyan('yarn'),
          chalk.yellow('start:dev'),
          chalk.green('to initialize application')
        )
        console.log(
          chalk.green('Please visit'),
          chalk.cyan('https://www.npmjs.com/package/expressjs-cli'),
          chalk.green('and follow step-by-step to configure project')
        )
        console.log(chalk.green('Process finished...'))
      } else {
        shell.exec('npm i --silent')
        console.log(
          chalk.cyan('Run'),
          chalk.green(`cd`),
          chalk.blueBright(project_name),
          chalk.green(`and npm`),
          chalk.cyan('run'),
          chalk.yellow('start:dev'),
          chalk.green('to initialize application')
        )
        console.log(
          chalk.green('Please visit'),
          chalk.cyan('https://www.npmjs.com/package/expressjs-cli'),
          chalk.green('and follow step-by-step to configure project')
        )
        console.log(chalk.green('Process finished...'))

      }

    }
    answer();

  });

program.command('crud <service_name>')
  .description('Generate a module with CRUD')
  .action(async (service_name) => {
    console.log(chalk.cyanBright(figlet.textSync('EXPRESSJS-CLI')))
    const mainPath = process.cwd();
    shell.cd('src/apps')
    shell.mkdir(service_name)
    shell.cd(service_name);

    console.log(
      chalk.green('generating'),
      chalk.cyan(`${service_name}.entity.ts`),
      chalk.green('...'),
    )
    const entity = await fs.readFileSync(path.resolve(__dirname, 'artifacts', 'entity.txt'), { encoding: 'utf-8' })
    const entityReplaces = entity.replace(/Replace/g, service_name);
    await fs.writeFileSync(`${mainPath}/src/apps/${service_name}/${service_name}.entity.ts`, entityReplaces, { encoding: 'utf-8' })

    console.log(
      chalk.green('generating'),
      chalk.cyan(`${service_name}Service.ts`),
      chalk.green('...'),
    )
    const service = await fs.readFileSync(path.resolve(__dirname, 'artifacts', 'service.txt'), { encoding: 'utf-8' })
    const serviceReplaces = service.replace(/Replace/g, service_name).replace(/REPLACE/g, service_name.toUpperCase());
    await fs.writeFileSync(`${mainPath}/src/apps/${service_name}/${service_name}Service.ts`, serviceReplaces, { encoding: 'utf-8' })

    console.log(
      chalk.green('generating'),
      chalk.cyan(`${service_name}Controller.ts`),
      chalk.green('...'),
    )
    const controller = await fs.readFileSync(path.resolve(__dirname, 'artifacts', 'controller.txt'), { encoding: 'utf-8' })
    const controllerReplaces = controller.replace(/Replace/g, service_name);
    await fs.writeFileSync(`${mainPath}/src/apps/${service_name}/${service_name}Controller.ts`, controllerReplaces, { encoding: 'utf-8' })

    console.log(
      chalk.green('generating'),
      chalk.cyan(`validator.ts`),
      chalk.green('...'),
    )
    const validator = await fs.readFileSync(path.resolve(__dirname, 'artifacts', 'validator.txt'), { encoding: 'utf-8' })
    const validatorReplaces = validator.replace(/Replace/g, service_name);
    await fs.writeFileSync(`${mainPath}/src/apps/${service_name}/validator.ts`, validatorReplaces, { encoding: 'utf-8' })

    console.log(
      chalk.green('generating'),
      chalk.cyan(`routes.ts`),
      chalk.green('...'),
    )
    const routes = await fs.readFileSync(path.resolve(__dirname, 'artifacts', 'routes.txt'), { encoding: 'utf-8' })
    const routesReplaces = routes.replace(/Replace/g, service_name);
    await fs.writeFileSync(`${mainPath}/src/apps/${service_name}/routes.ts`, routesReplaces, { encoding: 'utf-8' })

    console.log(
      chalk.green('generating'),
      chalk.cyan(`${service_name.toLowerCase()}.test.ts`),
      chalk.green('...'),
    )
    const test = await fs.readFileSync(path.resolve(__dirname, 'artifacts', 'test.txt'), { encoding: 'utf-8' })
    const testReplaces = test.replace(/Replace/g, service_name).replace(/REPLACE/g, service_name.toUpperCase()).replace(/replace/g, service_name.toLowerCase())
    shell.mkdir(`${mainPath}/tests/${service_name}`);
    await fs.writeFileSync(`${mainPath}/tests/${service_name}/${service_name.toLowerCase()}.test.ts`, testReplaces, { encoding: 'utf-8' })

    console.log(
      chalk.yellow('CRUD'),
      chalk.green('for'),
      chalk.cyan(service_name),
      chalk.green('generated.')
    );
    console.log(chalk.red('OBS:'), chalk.greenBright('Update main routes with new Module.'));
    console.log(chalk.red('OBS:'), chalk.greenBright('Update db connection with new Entity'));
    console.log(
      chalk.green('Please visit'),
      chalk.cyan('https://www.npmjs.com/package/expressjs-cli'),
      chalk.green('and follow step-by-step to configure project')
    )

    console.log(chalk.green('finished.'))



  })

program.parse(process.argv);