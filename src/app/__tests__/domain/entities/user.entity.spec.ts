import { User } from '@domain/entities/user.entity';

describe('User Entity', () => {
 
  it('should create a valid User instance', () => {
   

     const user = new User(
      '1',
      'John Doe',
      'johnDoe@test.com',
      ['admin', 'user'],
      true,
      new Date('2024-01-01'),
    );
    expect(user.id).toBe('1');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johnDoe@test.com');
    expect(user.roles).toContain('admin');
    expect(user.isActive).toBe(true);
    expect(user.createdAt).toBeInstanceOf(Date);
  });

   it('should throw when email is invalid', () => {
    expect(() => {
      new User('1', 'John Doe', 'invalid-email');
    }).toThrowError('Invalid email format');
  });

  it('should throw when name is too short', () => {
    expect(() => {
      new User('1', 'J', 'test@example.com');
    }).toThrowError('Name must have at least 2 characters');
  });

  it('should check if user has a role', () => {
    const user = new User('1', 'John Doe', 'test@mail.com', ['admin', 'editor']);
    expect(user.hasRole('admin')).toBe(true);
    expect(user.hasRole('user')).toBe(false);
  });

  it('should check if user has any of the given roles', () => {
    const user = new User('1', 'John Doe', 'test@mail.com', ['editor']);
    expect(user.hasAnyRole(['admin', 'editor'])).toBe(true);
    expect(user.hasAnyRole(['admin', 'guest'])).toBe(false);
  });

  it('should allow access if active and has roles', () => {
    const user = new User('1', 'John Doe', 't@mail.com', ['admin']);
    expect(user.canAccess(['admin'])).toBe(true);
  });

  it('should deny access if inactive', () => {
    const user = new User('1', 'John Doe', 't@mail.com', ['admin'], false);
    expect(user.canAccess(['admin'])).toBe(false);
  });

  it('should allow access if no roles are required', () => {
    const user = new User('1', 'John Doe', 't@mail.com', ['admin']);
    expect(user.canAccess([])).toBe(true);
  });

  it('should create user from API response', () => {
    const data = {
      id: '10',
      name: 'Carlos',
      email: 'carlos@mail.com',
      roles: ['user'],
      isActive: true,
      createdAt: '2024-01-01T00:00:00.000Z'
    };

    const user = User.fromApiResponse(data);

    expect(user.name).toBe('Carlos');
    expect(user.email).toBe('carlos@mail.com');
    expect(user.createdAt.toISOString()).toBe(data.createdAt);
  });

  it('should create user from dummy API response', () => {
    const data = {
      id: '10',
      firstName: 'Carlos',
      lastName: 'Lopez',
      email: 'carlos@mail.com'
    };

    const user = User.dummyFromApiResponse(data);

    expect(user.name).toBe('Carlos Lopez');
    expect(user.roles).toContain('user');
  });

  it('should convert user to plain object', () => {
    const user = new User('1', 'Johan', 'test@mail.com', ['admin']);

    const plain = user.toPlainObject();

    expect(plain).toHaveProperty('id', '1');
    expect(plain).toHaveProperty('name', 'Johan');
    expect(plain).toHaveProperty('email', 'test@mail.com');
    expect(plain.roles).toContain('admin');
    expect(typeof plain.createdAt).toBe('string'); // ISO string
  });
});
