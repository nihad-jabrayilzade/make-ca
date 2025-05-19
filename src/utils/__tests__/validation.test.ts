import { validateEntityName } from '../validation';

describe('validateEntityName', () => {
  // Tests for successful scenarios
  it('should accept valid entity names', () => {
    expect(() => validateEntityName('user')).not.toThrow();
    expect(() => validateEntityName('user-profile')).not.toThrow();
    expect(() => validateEntityName('blog-post123')).not.toThrow();
  });

  // Tests for minimum length
  it('should reject names shorter than 3 characters', () => {
    expect(() => validateEntityName('a')).toThrow('Entity name must be at least 3 characters long');
    expect(() => validateEntityName('ab')).toThrow('Entity name must be at least 3 characters long');
    expect(() => validateEntityName('123')).toThrow('Entity name must start with a letter');
  });

  // Tests for starting with a letter
  it('should reject names that do not start with a letter', () => {
    expect(() => validateEntityName('123user')).toThrow('Entity name must start with a letter');
    expect(() => validateEntityName('-user')).toThrow('Entity name must start with a letter');
    expect(() => validateEntityName('_user')).toThrow('Entity name must start with a letter');
  });

  // Tests for valid characters
  it('should reject names with invalid characters', () => {
    expect(() => validateEntityName('user_profile')).toThrow('Entity name must only contain lowercase letters, numbers, and hyphens');
    expect(() => validateEntityName('user space')).toThrow('Entity name must only contain lowercase letters, numbers, and hyphens');
    expect(() => validateEntityName('user@profile')).toThrow('Entity name must only contain lowercase letters, numbers, and hyphens');
    expect(() => validateEntityName('UserProfile')).toThrow('Entity name must only contain lowercase letters, numbers, and hyphens');
  });

  // Tests for reserved words
  it('should reject reserved words', () => {
    expect(() => validateEntityName('class')).toThrow('Entity name cannot be a reserved word: class');
    expect(() => validateEntityName('function')).toThrow('Entity name cannot be a reserved word: function');
    expect(() => validateEntityName('interface')).toThrow('Entity name cannot be a reserved word: interface');
  });
}); 