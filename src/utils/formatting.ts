import { camelCase, pascalCase, paramCase } from 'change-case';
import pluralize from 'pluralize';

export interface EntityNameFormats {
  // Base forms
  kebabCase: string;        // e.g., "user-profile"
  camelCase: string;        // e.g., "userProfile"
  pascalCase: string;       // e.g., "UserProfile"
  
  // Pluralized forms
  pluralKebabCase: string;  // e.g., "user-profiles"
  pluralCamelCase: string;  // e.g., "userProfiles"
  pluralPascalCase: string; // e.g., "UserProfiles"
  
  // For database tables
  tableName: string;        // e.g., "UserProfilesTbl"
}

/**
 * Generates all necessary format variations of an entity name
 * 
 * @param entityName Entity name in kebab-case (e.g., "user-profile")
 * @returns Object with all variations of the entity name
 */
export function formatEntityName(entityName: string): EntityNameFormats {
  // Ensure input is kebab-case
  const kebabCase = paramCase(entityName);
  
  // Generate base forms
  const camelCaseEntity = camelCase(kebabCase);
  const pascalCaseEntity = pascalCase(kebabCase);
  
  // Generate pluralized forms
  const pluralKebabCase = pluralize(kebabCase);
  const pluralCamelCase = pluralize(camelCaseEntity);
  const pluralPascalCase = pluralize(pascalCaseEntity);
  
  // Generate table name
  const tableName = `${pluralPascalCase}Tbl`;
  
  return {
    kebabCase,
    camelCase: camelCaseEntity,
    pascalCase: pascalCaseEntity,
    pluralKebabCase,
    pluralCamelCase,
    pluralPascalCase,
    tableName
  };
} 