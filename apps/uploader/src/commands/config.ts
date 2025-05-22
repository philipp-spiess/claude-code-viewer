import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { loadConfig, saveConfig } from '../config.js';

export function createConfigCommand(): Command {
  const command = new Command('config')
    .description('Configure the Claude uploader')
    .action(async () => {
      const currentConfig = loadConfig();
      
      console.log(chalk.blue('\nCurrent Configuration:'));
      console.log(`Server URL: ${chalk.yellow(currentConfig.serverUrl)}`);
      console.log('');
      
      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            { name: 'Change server URL', value: 'server' },
            { name: 'Exit', value: 'exit' }
          ]
        }
      ]);
      
      if (action === 'server') {
        const { serverUrl } = await inquirer.prompt([
          {
            type: 'input',
            name: 'serverUrl',
            message: 'Enter server URL:',
            default: currentConfig.serverUrl,
            validate: (input) => {
              try {
                new URL(input);
                return true;
              } catch {
                return 'Please enter a valid URL';
              }
            }
          }
        ]);
        
        saveConfig({ serverUrl });
        console.log(chalk.green(`\n✓ Server URL updated to: ${serverUrl}`));
      }
    });
  
  return command;
}