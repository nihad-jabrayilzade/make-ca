import { camelCase, pascalCase, paramCase } from 'change-case'
import { EntityNameFormats } from '../types'

const pluralize = require('pluralize')

/**
 * Generates all necessary format variations of an entity name
 *
 * @param entityName Entity name in kebab-case (e.g., "user-profile")
 * @returns Object with all variations of the entity name
 */
export function formatEntityName(entityName: string): EntityNameFormats {
	const kebabCase = paramCase(entityName)

	const camelCaseEntity = camelCase(kebabCase)
	const pascalCaseEntity = pascalCase(kebabCase)

	const pluralKebabCase = pluralize(kebabCase)
	const pluralCamelCase = pluralize(camelCaseEntity)
	const pluralPascalCase = pluralize(pascalCaseEntity)

	return {
		kebabCase,
		camelCase: camelCaseEntity,
		pascalCase: pascalCaseEntity,
		pluralKebabCase,
		pluralCamelCase,
		pluralPascalCase,
	}
}
