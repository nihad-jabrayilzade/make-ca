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
  // Check minimum length
  if (entityName.length < 3) {
    throw new Error('Entity name must be at least 3 characters long');
  }

  // Check if starts with a letter
  if (!/^[a-z]/.test(entityName)) {
    throw new Error('Entity name must start with a letter');
  }

  // Check if contains only allowed characters (letters, numbers, hyphens)
  if (!/^[a-z0-9-]+$/.test(entityName)) {
    throw new Error('Entity name must only contain lowercase letters, numbers, and hyphens');
  }

  // Check for reserved words
  const reservedWords = [
    'class', 'interface', 'type', 'enum', 'const', 'let', 'var',
    'function', 'async', 'await', 'import', 'export', 'default',
    'return', 'if', 'else', 'for', 'while', 'switch', 'case',
    'break', 'continue', 'try', 'catch', 'throw', 'new', 'this',
    'super', 'extends', 'implements', 'module', 'delete', 'void',
    'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
    'process', 'global', 'console', 'Object', 'Array', 'String',
    'Number', 'Boolean', 'Symbol', 'Date', 'RegExp', 'Map', 'Set',
    'Promise', 'Error', 'TypeScript', 'JavaScript'
  ];

  if (reservedWords.includes(entityName)) {
    throw new Error(`Entity name cannot be a reserved word: ${entityName}`);
  }
} 