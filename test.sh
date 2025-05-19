#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting CLI generator testing...${NC}"

# Create test directory
TEST_DIR="./test-output"
rm -rf $TEST_DIR
mkdir -p $TEST_DIR

echo -e "${BLUE}1. Installing dependencies and building CLI...${NC}"
npm install
npm run build

# Create local link for testing
npm link

echo -e "${BLUE}2. Testing init command...${NC}"
# Test initialization in specified directory
make-ca init -p $TEST_DIR/project1

# Check that structure was created
if [ -d "$TEST_DIR/project1/src/core" ] && [ -d "$TEST_DIR/project1/src/application" ] && [ -d "$TEST_DIR/project1/src/infrastructure" ]; then
    echo -e "${GREEN}✓ Project structure successfully created in $TEST_DIR/project1${NC}"
else
    echo -e "${RED}✗ Failed to create project structure in $TEST_DIR/project1${NC}"
    exit 1
fi

echo -e "${BLUE}3. Testing generate command...${NC}"
# Test entity generation
make-ca generate user -p $TEST_DIR/project1

# Check that entity was created
if [ -d "$TEST_DIR/project1/src/core/domain/user" ] && [ -d "$TEST_DIR/project1/src/core/service/user" ]; then
    echo -e "${GREEN}✓ User entity successfully created${NC}"
else
    echo -e "${RED}✗ Failed to create user entity${NC}"
    exit 1
fi

# Test entity generation with skip option
echo -e "${BLUE}4. Testing generate command with --skip-domain option...${NC}"
make-ca generate product --skip-domain -p $TEST_DIR/project1

# Check that entity was created without domain
if [ ! -d "$TEST_DIR/project1/src/core/domain/product" ] && [ -d "$TEST_DIR/project1/src/infrastructure/persistence/typeorm/feature/product" ]; then
    echo -e "${GREEN}✓ Product entity successfully created without domain layer${NC}"
else
    echo -e "${RED}✗ Failed to correctly create product entity with --skip-domain option${NC}"
    exit 1
fi

# Test in current directory
echo -e "${BLUE}5. Testing initialization in current directory...${NC}"
CURRENT_TEST_DIR="$TEST_DIR/current-dir-test"
mkdir -p $CURRENT_TEST_DIR
cd $CURRENT_TEST_DIR
make-ca init

# Check structure creation in current directory
if [ -d "src/core" ] && [ -d "src/application" ] && [ -d "src/infrastructure" ]; then
    echo -e "${GREEN}✓ Project structure successfully created in current directory${NC}"
else
    echo -e "${RED}✗ Failed to create project structure in current directory${NC}"
    cd -
    exit 1
fi

# Entity generation in current directory
make-ca generate category
if [ -d "src/core/domain/category" ]; then
    echo -e "${GREEN}✓ Category entity successfully created in current directory${NC}"
else
    echo -e "${RED}✗ Failed to create category entity in current directory${NC}"
    cd -
    exit 1
fi

# Return to original directory
cd -

echo -e "${BLUE}6. Simulating npx usage...${NC}"
# Instead of actual npx, we'll use the local CLI to simulate similar behavior
echo -e "${GREEN}✓ All tests passed!${NC}"
echo -e "${BLUE}Test results available in directory: $TEST_DIR${NC}"
echo -e "${BLUE}For actual npx testing, the package would be published and tested with:${NC}"
echo -e "${BLUE}npx make-ca init -p my-project${NC}"
echo -e "${BLUE}npx make-ca generate user -p my-project${NC}"

# Clean up the link
npm unlink 