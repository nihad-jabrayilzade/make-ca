# make-ca

A powerful CLI tool that generates a complete Clean Architecture boilerplate for NestJS projects with TypeORM integration. Designed to accelerate your development workflow by automating the creation of properly structured TypeScript code following Clean Architecture principles.

## What is Clean Architecture?

Clean Architecture is a software design philosophy that separates concerns into distinct layers, making your codebase more maintainable, testable, and adaptable to change. The layers include:

- **Domain Layer**: Contains business logic, entities, and interfaces
- **Application Layer**: Orchestrates the flow of data between domain and infrastructure
- **Infrastructure Layer**: Handles external concerns like databases, frameworks, and external services

## Features

- **Project Scaffolding**: Initialize a complete NestJS project with proper Clean Architecture structure
- **Entity Generation**: Create fully-featured entities with all necessary layers:
  - Domain layer (entities, repositories, use cases, exceptions)
  - Service layer (use case implementations)
  - Infrastructure layer (TypeORM entities, mappers, repositories)
  - Application layer (controllers, DTOs, modules)
- **Selective Generation**: Skip specific layers based on your needs
- **Convention Enforcement**: Follows Clean Architecture best practices
- **TypeORM Integration**: Built-in database access patterns
- **Dependency Injection**: Proper DI setup with NestJS modules
- **API Documentation**: Auto-generated Swagger endpoints
- **Type Safety**: Fully typed TypeScript implementation

## Installation

```bash
# Install globally
npm install -g make-ca

# Or use directly with npx
npx make-ca <command>
```

## Quick Start

### Initialize a new project

```bash
# Create a new project
npx make-ca init -p my-clean-app

# Or initialize in the current directory
npx make-ca init
```

### Generate an entity

```bash
# Generate in the current directory
npx make-ca generate product
```

### Selective Generation

```bash
# Skip specific layers
npx make-ca generate order --skip-domain
npx make-ca generate customer --skip-infrastructure
npx make-ca generate category --skip-application

# Generate only specific layers
npx make-ca generate invoice --only-domain
npx make-ca generate payment --only-infrastructure
```

## Project Structure

The generated project follows a clean architecture pattern:

```
src/
├── core/
│   ├── domain/         # Business logic, entities, interfaces
│   │   └── user/       # Domain layer for 'user' entity
│   ├── shared/         # Shared code across entities
│   │   ├── type/       # Common types
│   │   ├── exception/  # Base exceptions
│   │   └── util/       # Utilities
│   └── service/        # Use case implementations
│       └── user/       # Service layer for 'user' entity
├── infrastructure/
│   └── persistence/
│       └── typeorm/    # TypeORM implementation
│           └── feature/
│               └── user/ # TypeORM entities for 'user'
└── application/
    ├── api/
    │   └── rest/       # REST API controllers
    │       ├── shared/ # Shared API components
    │       └── user/   # Controllers for 'user' entity
    └── di/             # Dependency injection modules
        └── feature/
            └── UserModule.ts # DI module for 'user' entity
```

## Entity Naming Rules

- Entity names must be in kebab-case (e.g., `user`, `blog-post`)
- Must be at least 3 characters long
- Must start with a letter
- Can only contain letters, numbers, and hyphens

## Important Note

After generating a project, you need to create a `config.yaml` file based on the provided `config.yaml.example` template to ensure your project works correctly. 

Once your project is running, you can test the API endpoints through Swagger documentation at `/docs`.

## License

make-ca is [MIT Licensed](https://github.com/nihad-jabrayilzade/make-ca/blob/master/LICENSE)
