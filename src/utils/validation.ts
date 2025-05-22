import { reservedWords } from './constants'

/**
 * Checks if the entity name meets the minimum length requirement
 * @param entityName The entity name to validate
 * @throws Error if the name is too short
 */
function ensureMinimumLength(entityName: string): void {
	if (entityName.length < 3) {
		throw new Error('Entity name must be at least 3 characters long')
	}
}

/**
 * Checks if the entity name starts with a letter
 * @param entityName The entity name to validate
 * @throws Error if the name doesn't start with a letter
 */
function ensureStartsWithLetter(entityName: string): void {
	if (!/^[a-z]/.test(entityName)) {
		throw new Error('Entity name must start with a letter')
	}
}

/**
 * Checks if the entity name contains only allowed characters
 * @param entityName The entity name to validate
 * @throws Error if the name contains invalid characters
 */
function ensureAllowedCharactersOnly(entityName: string): void {
	if (!/^[a-z0-9-]+$/.test(entityName)) {
		throw new Error('Entity name must only contain lowercase letters, numbers, and hyphens')
	}
}

/**
 * Checks if the entity name is not a reserved word
 * @param entityName The entity name to validate
 * @throws Error if the name is a reserved word
 */
function ensureNotReservedWord(entityName: string): void {
	if (reservedWords.includes(entityName)) {
		throw new Error(`Entity name cannot be a reserved word: ${entityName}`)
	}
}

/**
 * Validates if the provided entity name is valid
 *
 * Rules:
 * - Must be at least 3 characters long
 * - Must start with a letter
 * - Must only contain letters, numbers, and hyphens
 * - No spaces or special characters
 * - Cannot be a reserved word
 *
 * @param entityName The entity name to validate
 */
export function validateEntityName(entityName: string): void {
	ensureMinimumLength(entityName)
	ensureStartsWithLetter(entityName)
	ensureAllowedCharactersOnly(entityName)
	ensureNotReservedWord(entityName)
}
