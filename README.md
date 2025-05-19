# make-ca

A CLI tool for generating Clean Architecture templates for NestJS+TypeORM projects.

## Usage

You can use this tool directly with npx without installing it:

```bash
# Initialize a new project
npx make-ca init -p my-new-project

# Generate an entity in your project
npx make-ca generate user -p my-new-project
```

## Installation

If you prefer to install the package globally:

```bash
# Install globally
npm install -g make-ca

# Then use without npx prefix
make-ca init -p my-new-project
make-ca generate user -p my-new-project
```

## Commands

### Initialize a new project

```bash
# Using npx
npx make-ca init -p ./my-new-project

# Or if installed globally
make-ca init -p ./my-new-project

# You can also initialize in the current directory
npx make-ca init
```

This command initializes a new clean architecture project structure.

### Generate an entity

```bash
# Using npx
npx make-ca generate user -p ./my-project

# Or if installed globally
make-ca generate user -p ./my-project

# Generate in the current directory
npx make-ca generate user
```

This command generates all the layers (domain, service, infrastructure, application) for the specified entity.

### Generate with selective layers

You can skip specific layers using the following options:

```bash
# Skip domain layer
npx make-ca generate user --skip-domain

# Skip infrastructure layer
npx make-ca generate user --skip-infrastructure

# Skip application layer
npx make-ca generate user --skip-application

# Skip multiple layers
npx make-ca generate user --skip-domain --skip-application

# Combine with path option
npx make-ca generate user --skip-domain -p ./my-project
```

## Entity Naming Rules

- Entity names must be in kebab-case (e.g., user, user-profile, blog-post)
- Must be at least 3 characters long
- Must start with a letter
- Must only contain letters, numbers, and hyphens
- No spaces or special characters
- Cannot be a reserved word

## Project Structure

The generated project follows a clean architecture structure:

- **Core Layer**
  - Domain: Entities, repositories, use cases, exceptions
  - Service: Use case implementations

- **Infrastructure Layer**
  - Persistence: TypeORM entities, mappers, repositories

- **Application Layer**
  - API: REST controllers, documentation

## License

MIT 