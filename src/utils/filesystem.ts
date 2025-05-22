const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const ora = require('ora')
const ejs = require('ejs')
import { EntityNameFormats } from './formatting'

/**
 * Checks if a project has been initialized by looking for the required directories
 *
 * @param projectPath Path to check (defaults to current working directory)
 * @returns boolean indicating if project is initialized
 */
export function isProjectInitialized(projectPath?: string): boolean {
	const basePath = projectPath || process.cwd()

	// Check for key directories
	return (
		fs.existsSync(path.join(basePath, 'src')) &&
		fs.existsSync(path.join(basePath, 'src', 'core')) &&
		fs.existsSync(path.join(basePath, 'src', 'application')) &&
		fs.existsSync(path.join(basePath, 'src', 'infrastructure'))
	)
}

/**
 * Creates directories for a new entity in the project
 *
 * @param entityName Entity name in kebab-case
 * @param projectPath Path to the project (defaults to current working directory)
 * @returns Object with paths to created directories
 */
export function createEntityDirectories(entityName: string, projectPath?: string): Record<string, string> {
	const spinner = ora('Creating entity structure...').start()
	const basePath = projectPath || process.cwd()

	try {
		// Create domain layer directories
		const domainDir = path.join(basePath, 'src', 'core', 'domain', entityName)
		const domainSubdirs = [
			'entity',
			'repository',
			'repository/port',
			'repository/result',
			'use-case',
			'use-case/port',
			'use-case/result',
			'exception',
			'di',
		]

		domainSubdirs.forEach(dir => {
			fs.ensureDirSync(path.join(domainDir, dir))
		})

		// Create service layer directories
		const serviceDir = path.join(basePath, 'src', 'core', 'service', entityName)
		fs.ensureDirSync(serviceDir)

		// Create infrastructure layer directories
		const infraDir = path.join(basePath, 'src', 'infrastructure', 'persistence', 'typeorm', 'feature', entityName)
		fs.ensureDirSync(infraDir)

		// Create application layer directories
		const appDir = path.join(basePath, 'src', 'application', 'api', 'rest', entityName)
		const appSubdirs = ['controller', 'documentation', 'documentation/body', 'documentation/query']
		appSubdirs.forEach(dir => {
			fs.ensureDirSync(path.join(appDir, dir))
		})

		// Create DI feature module directory
		const diFeatureDir = path.join(basePath, 'src', 'application', 'di', 'feature')
		fs.ensureDirSync(diFeatureDir)

		spinner.succeed(chalk.green('Entity structure created successfully'))

		return {
			domainDir,
			serviceDir,
			infraDir,
			appDir,
			diFeatureDir,
		}
	} catch (error) {
		spinner.fail(chalk.red('Failed to create entity structure'))
		throw error
	}
}

/**
 * Renders a template file with the provided data and writes it to the destination
 *
 * @param templateFile Path to the template file
 * @param destFile Path to the destination file
 * @param data Data to be used in the template
 */
export async function renderTemplate(
	templateFile: string,
	destFile: string,
	data: { entity?: EntityNameFormats; [key: string]: any }
): Promise<void> {
	try {
		// Get template content
		const templateContent = fs.readFileSync(templateFile, 'utf-8')

		// Render the template
		const rendered = await ejs.render(templateContent, data, { async: true })

		// Ensure the destination directory exists
		fs.ensureDirSync(path.dirname(destFile))

		// Write the file
		fs.writeFileSync(destFile, rendered)
	} catch (error: unknown) {
		throw new Error(
			`Failed to render template ${templateFile}: ${error instanceof Error ? error.message : String(error)}`
		)
	}
}

/**
 * Initializes a new clean architecture project structure
 *
 * @param projectPath Path where to initialize the project (defaults to current working directory)
 */
export function initializeProjectStructure(projectPath?: string): void {
	const spinner = ora('Initializing project structure...').start()
	const basePath = projectPath || process.cwd()
	const projectName = path.basename(basePath)

	try {
		// Create base directory structure
		const coreDirs = [
			'src/core/shared',
			'src/core/shared/util',
			'src/core/shared/use-case',
			'src/core/shared/type',
			'src/core/shared/repository',
			'src/core/shared/exception',
			'src/core/shared/mapper',
			'src/core/shared/constants',
			'src/core/domain',
			'src/core/service',
		]

		const appDirs = [
			'src/application/api/rest/shared/filter',
			'src/application/api/rest/shared/interceptor',
			'src/application/api/rest/shared/query',
			'src/application/config',
			'src/application/di',
			'src/application/di/feature',
			'src/application/di/infrastructure',
		]

		const infraDirs = [
			'src/infrastructure/persistence/typeorm/migrations',
			'src/infrastructure/persistence/typeorm/feature',
		]

		// Create all directories
		;[...coreDirs, ...appDirs, ...infraDirs].forEach(dir => {
			fs.ensureDirSync(path.join(basePath, dir))
		})

		// Create shared utility files
		copySharedTemplates(basePath)

		// Create NestJS application files
		createNestJSFiles(basePath, projectName)

		spinner.succeed(chalk.green('Project structure initialized successfully'))
	} catch (error) {
		spinner.fail(chalk.red('Failed to initialize project structure'))
		throw error
	}
}

/**
 * Copies shared template files to the project
 *
 * @param projectPath Path to the project root
 */
async function copySharedTemplates(targetPath: string): Promise<void> {
	const sharedDirs = [
		'constants',
		'type',
		'use-case',
		'use-case/result',
		'use-case/port',
		'exception',
		'mapper',
		'repository',
		'repository/result',
		'repository/port',
		'util/delay',
		'util/assert',
		'util/checker',
	]

	for (const dir of sharedDirs) {
		const sourceDir = path.join(__dirname, '..', '..', 'templates', 'shared', dir)
		const targetDir = path.join(targetPath, 'src', 'core', 'shared', dir)
		await fs.mkdir(targetDir, { recursive: true })

		const files = await fs.readdir(sourceDir)
		for (const file of files) {
			if (file.endsWith('.ejs')) {
				const sourceFile = path.join(sourceDir, file)
				const targetFile = path.join(targetDir, file.replace('.ejs', ''))
				await renderTemplate(sourceFile, targetFile, {})
			}
		}
	}
}

/**
 * Creates NestJS-specific files for the project
 *
 * @param projectPath Path to the project root
 * @param projectName Name of the project
 */
async function createNestJSFiles(projectPath: string, projectName: string): Promise<void> {
	const spinner = ora('Setting up NestJS files...').start()
	try {
		const templatesDir = path.join(__dirname, '../../templates')

		// Create root NestJS files
		const rootFiles = [
			{ template: 'project/nest-cli.json.ejs', dest: 'nest-cli.json' },
			{ template: 'project/tsconfig.json.ejs', dest: 'tsconfig.json' },
			{ template: 'project/main.ts.ejs', dest: 'main.ts' },
			{ template: 'project/package.json.ejs', dest: 'package.json', data: { projectName } },
			{ template: 'project/.prettierrc.ejs', dest: '.prettierrc' },
			{ template: 'project/.eslintrc.js.ejs', dest: '.eslintrc.js' },
			{ template: 'project/.gitignore.ejs', dest: '.gitignore' },
			{ template: 'project/config.yaml.example.ejs', dest: 'config.yaml.example', data: { projectName } },
		]

		for (const file of rootFiles) {
			await renderTemplate(path.join(templatesDir, file.template), path.join(projectPath, file.dest), file.data || {})
		}

		// Create application files
		const appFiles = [
			{ template: 'application/ServerApplication.ts.ejs', dest: 'src/application/ServerApplication.ts' },
			{ template: 'application/config/index.ts.ejs', dest: 'src/application/config/index.ts' },
			{ template: 'application/config/type.ts.ejs', dest: 'src/application/config/type.ts' },
			{ template: 'application/config/validation-schema.ts.ejs', dest: 'src/application/config/validation-schema.ts' },
		]

		for (const file of appFiles) {
			await renderTemplate(path.join(templatesDir, file.template), path.join(projectPath, file.dest), {})
		}

		// Create DI modules
		const diFiles = [
			{ template: 'application/di/RootModule.ts.ejs', dest: 'src/application/di/RootModule.ts' },
			{ template: 'application/di/ApplicationModule.ts.ejs', dest: 'src/application/di/ApplicationModule.ts' },
			{ template: 'application/di/ConfigModule.ts.ejs', dest: 'src/application/di/ConfigModule.ts' },
			{ template: 'application/di/FeatureModule.ts.ejs', dest: 'src/application/di/FeatureModule.ts' },
			{ template: 'application/di/InfrastructureModule.ts.ejs', dest: 'src/application/di/InfrastructureModule.ts' },
			{
				template: 'application/di/infrastructure/DatabaseModule.ts.ejs',
				dest: 'src/application/di/infrastructure/DatabaseModule.ts',
			},
		]

		for (const file of diFiles) {
			await renderTemplate(path.join(templatesDir, file.template), path.join(projectPath, file.dest), {})
		}

		// Create API shared files
		const apiFiles = [
			{
				template: 'application/api/rest/shared/filter/RestApiHttpExceptionFilter.ts.ejs',
				dest: 'src/application/api/rest/shared/filter/RestApiHttpExceptionFilter.ts',
			},
			{
				template: 'application/api/rest/shared/interceptor/RestApiResponseInterceptor.ts.ejs',
				dest: 'src/application/api/rest/shared/interceptor/RestApiResponseInterceptor.ts',
			},
			{
				template: 'application/api/rest/shared/query/RestApiGetEntitiesQuery.ts.ejs',
				dest: 'src/application/api/rest/shared/query/RestApiGetEntitiesQuery.ts',
			},
			{
				template: 'application/api/rest/shared/query/index.ts.ejs',
				dest: 'src/application/api/rest/shared/query/index.ts',
			},
		]

		for (const file of apiFiles) {
			await renderTemplate(path.join(templatesDir, file.template), path.join(projectPath, file.dest), {})
		}

		// Create infrastructure files
		const infraFiles = [
			{
				template: 'infrastructure/persistence/typeorm/index.ts.ejs',
				dest: 'src/infrastructure/persistence/typeorm/index.ts',
			},
		]

		for (const file of infraFiles) {
			await renderTemplate(path.join(templatesDir, file.template), path.join(projectPath, file.dest), {})
		}

		spinner.succeed(chalk.green('NestJS files setup completed'))
	} catch (error) {
		spinner.fail(chalk.red('Failed to setup NestJS files'))
		throw error
	}
}
