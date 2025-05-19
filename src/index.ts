#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { generateCommand } from './commands/generate';
import { validateEntityName } from './utils/validation';

const program = new Command();

program
  .name('make-ca')
  .description('CLI tool for generating Clean Architecture templates for NestJS+TypeORM')
  .version('1.0.0');

// Initialize project command
program
  .command('init')
  .description('Initialize a new clean architecture project')
  .option('-p, --path <path>', 'Path where the project should be initialized (defaults to current directory)')
  .action((options) => {
    initCommand(options.path);
  });

// Generate entity command
program
  .command('generate <entity>')
  .description('Generate entity layers (e.g., make-ca generate user)')
  .option('--skip-domain', 'Skip generating domain layer')
  .option('--skip-infrastructure', 'Skip generating infrastructure layer')
  .option('--skip-application', 'Skip generating application layer')
  .option('-p, --path <path>', 'Path where the entity should be generated (defaults to current directory)')
  .action((entity, options) => {
    const entityName = entity.trim().toLowerCase();
    
    try {
      validateEntityName(entityName);
      generateCommand(entityName, options);
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.red(`Error: ${error.message}`));
        process.exit(1);
      }
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`));
  console.log(`See ${chalk.blue('--help')} for a list of available commands.`);
  process.exit(1);
});

// If no arguments provided, show help
if (process.argv.length === 2) {
  program.help();
}

program.parse(process.argv); 