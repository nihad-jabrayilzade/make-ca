const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const ora = require('ora')
import { isProjectInitialized, initializeProjectStructure } from '../utils/filesystem'

/**
 * Handler for the 'init' command
 * Initializes a new clean architecture project structure
 *
 * @param targetPath Optional path where the project should be initialized (defaults to 'my-clean-project' directory)
 */
export async function init(targetPath?: string): Promise<void> {
	const spinner = ora('Starting project initialization...').start()

	try {
		// Use the provided path or default to 'my-clean-project' directory
		const projectPath = targetPath ? path.resolve(targetPath) : path.resolve(process.cwd(), 'my-clean-projectt')

		// Create the directory if it doesn't exist
		try {
			fs.ensureDirSync(projectPath)
			spinner.succeed(chalk.green(`Using directory: ${projectPath}`))
		} catch (error) {
			spinner.fail(chalk.red(`Failed to create directory: ${projectPath}`))
			if (error instanceof Error) {
				console.error(chalk.red(error.message))
			}
			process.exit(1)
		}

		// Check if the directory is empty
		const files = fs.readdirSync(projectPath)
		if (files.length > 0) {
			spinner.warn(chalk.yellow(`Warning: The directory ${projectPath} is not empty.`))
			spinner.warn(chalk.yellow('Some files might be overwritten.'))
		}

		// Check if project is already initialized
		if (isProjectInitialized(projectPath)) {
			spinner.warn(chalk.yellow('Project is already initialized!'))
			console.log('You can now use ' + chalk.blue('make-ca generate <entity>') + ' to generate entities.')
			return
		}

		spinner.succeed(chalk.green(`Initializing a new clean architecture project in ${projectPath}...`))

		// Initialize project structure
		initializeProjectStructure(projectPath)

		console.log('\n' + chalk.green('✓') + ' Project initialized successfully!')
		console.log('\nYou can now use ' + chalk.blue('make-ca generate <entity>') + ' to generate entities.')
	} catch (error) {
		if (error instanceof Error) {
			spinner.fail(chalk.red(`Error initializing project: ${error.message}`))
		} else {
			spinner.fail(chalk.red('An unknown error occurred during initialization'))
		}
		process.exit(1)
	}
}
