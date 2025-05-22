export interface EntityNameFormats {
	kebabCase: string // e.g., "user-profile"
	camelCase: string // e.g., "userProfile"
	pascalCase: string // e.g., "UserProfile"
	pluralKebabCase: string // e.g., "user-profiles"
	pluralCamelCase: string // e.g., "userProfiles"
	pluralPascalCase: string // e.g., "UserProfiles"
}

export interface GenerateOptions {
	skipDomain?: boolean
	skipInfrastructure?: boolean
	skipApplication?: boolean
	onlyDomain?: boolean
	onlyInfrastructure?: boolean
	onlyApplication?: boolean
}
