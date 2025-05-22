import { camelCase, pascalCase, paramCase } from 'change-case'
const pluralize = require('pluralize')

export interface EntityNameFormats {
	kebabCase: string // e.g., "user-profile"
	camelCase: string // e.g., "userProfile"
	pascalCase: string // e.g., "UserProfile"
	pluralKebabCase: string // e.g., "user-profiles"
	pluralCamelCase: string // e.g., "userProfiles"
	pluralPascalCase: string // e.g., "UserProfiles"
}

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
