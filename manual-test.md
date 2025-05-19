# Manual Testing Guide for make-ca CLI

This guide will help you manually test the `make-ca` CLI tool both locally and via npx.

## Local Testing (During Development)

### Prerequisites

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Create a local symlink:
   ```bash
   npm link
   ```

### Testing Commands

#### 1. Initialize Project

Test in a specific directory:
```bash
make-ca init -p ./test-project
```

Test in current directory:
```bash
mkdir test-current-dir
cd test-current-dir
make-ca init
```

#### 2. Generate Entity

Generate in a specific project:
```bash
make-ca generate user -p ./test-project
```

Generate with skip options:
```bash
make-ca generate product --skip-domain -p ./test-project
```

Generate in current directory:
```bash
cd test-current-dir
make-ca generate category
```

## Testing with npx (After Publishing)

### Prerequisites

1. Publish the package to npm:
   ```bash
   npm publish
   ```
   
   Or for testing without publishing:
   ```bash
   npm pack
   ```

### Testing Commands

#### 1. Initialize Project

```bash
# Direct npx usage
npx make-ca init -p ./npx-test-project

# Using the tarball (if you used npm pack)
npx ./make-ca-1.0.0.tgz init -p ./npx-test-project
```

#### 2. Generate Entity

```bash
# Direct npx usage
npx make-ca generate user -p ./npx-test-project

# With skip options
npx make-ca generate product --skip-domain -p ./npx-test-project
```

## Testing Entity Name Validation

Try generating entities with invalid names to verify the validation works:

```bash
# Too short
npx make-ca generate ab

# Starting with number
npx make-ca generate 123user

# Invalid characters
npx make-ca generate user_profile

# Reserved word
npx make-ca generate class
```

Each should display an appropriate error message.

## Automated Testing

You can run the automated test script:

```bash
./test.sh
```

This will:
1. Build the package
2. Create a test directory
3. Run various commands to test functionality
4. Verify the output structure 