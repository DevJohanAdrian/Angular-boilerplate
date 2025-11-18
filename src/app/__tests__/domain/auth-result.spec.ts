import { AuthResult } from '@domain/value-objects/auth-result';
import { User } from '@domain/entities/user.entity';
// import { describe, it, expect, beforeEach } from 'vitest';

describe('AuthResult Value Object', () => {
  // it('should work', () => { expect(true).toBe(true); });
  const mockUser = new User(
    '1',
    'testuser',
    'testuser@test.com',
    ['user'],
    true,
    new Date(),
  );

  it('should create an AuthResult instance with valid data', () => {
    const result = new AuthResult(mockUser, 'validToken123', 'refreshToken456');

    expect(result.user).toBe(mockUser);
    expect(result.token).toBe('validToken123');
    expect(result.refreshToken).toBe('refreshToken456');
  });
});
