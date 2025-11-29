import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SignInUseCase } from '@domain/usecases/sign-in.usecase';
import { of, throwError, lastValueFrom  } from 'rxjs';
import { AuthRepository } from '@domain/interfaces/auth.repository';
import { User } from '@domain/entities/user.entity';
import { AuthResult } from '@domain/value-objects/auth-result';

describe('SignInUseCase', () => {
  let mockRepository: AuthRepository;
  let useCase: SignInUseCase;

  beforeEach(() => {
    mockRepository = {
      signIn: vi.fn()
    };

    useCase = new SignInUseCase(mockRepository as any);
  });

  // --------------------------------------------------------
  // VALIDACIÓN DEL INPUT
  // --------------------------------------------------------

  it('debe lanzar error si no se envía email/username', () => {
    expect(() => useCase['validateInput']('', '123456'))
      .toThrow('Email or username is required');
  });

  it('debe lanzar error si el password es muy corto', () => {
    expect(() => useCase['validateInput']('test@mail.com', '123'))
      .toThrow('Password must be at least 6 characters long');
  });


  it('debe validar el username correctamente', () => {
    expect(() => useCase['validateInput']('user$', '123456'))
      .toThrow('Username can only contain letters, numbers, dots, and underscores');
  });

  // --------------------------------------------------------
  // REGLAS DE NEGOCIO POST LOGIN
  // --------------------------------------------------------

//   it('debe lanzar error si el usuario no está activo', (done) => {
//     const fakeUser: User = { 
//       id: 1,
//       isActive: false,
//       roles: ['user'],
//     } as any;

//     const fakeResult = new AuthResult(fakeUser, 'token123', 'refreshtoken123');

//     vi.mocked(mockRepository.signIn).mockReturnValue(of(fakeResult));

//     useCase.execute('email@test.com', '123456').subscribe({
//       next: () => {
//         // NO debería llegar aquí
//         done('Debe lanzar un error');
//       },
//       error: (err) => {
//         expect(err.message).toBe('Authentication failed');
//         done();
//       },
//     });
//   });

  it('debe lanzar error si el usuario no está activo', async () => {
    const fakeUser: User = {
      id: 1,
      isActive: false,
      roles: ['user']
    } as any;

    vi.mocked(mockRepository.signIn).mockReturnValue(
      of(new AuthResult(fakeUser, 'token123', 'refreshtoken123'))
    );

    await expect(
      lastValueFrom(useCase.execute('email@test.com', '123456'))
    ).rejects.toThrow('Authentication failed');
  });


  it('debe lanzar error si el usuario no tiene roles', async() => {
    const fakeUser: User = { 
      id: 1,
      isActive: true,
      roles: [],
    } as any;

   const fakeResult = new AuthResult(fakeUser, 'token123', 'refreshtoken123');

    vi.mocked(mockRepository.signIn).mockReturnValue(of(fakeResult));

    
    await expect(
      lastValueFrom(useCase.execute('email@test.com', '123456'))
    ).rejects.toThrow('Authentication failed');

  
  });

  // --------------------------------------------------------
  // MAPEOS DE ERRORES DESDE INFRA A DOMINIO
  // --------------------------------------------------------

  it('debe mapear error 401 a "Invalid credentials"', async() => {
    vi.mocked(mockRepository.signIn)
      .mockReturnValue(throwError(() => ({ status: 401 })));

    // useCase.execute('email@test.com', '123456').subscribe({
    //   error: (err) => {
    //     expect(err.message).toBe('Invalid credentials');
    //     done();
    //   }
    // });
     await expect(
      lastValueFrom(useCase.execute('email@test.com', '123456'))
    ).rejects.toThrow('Invalid credentials');
  });

  it('debe mapear error 429 a "Too many login attempts"', async() => {
    vi.mocked(mockRepository.signIn)
      .mockReturnValue(throwError(() => ({ status: 429 })));

    // useCase.execute('user', '123456').subscribe({
    //   error: (err) => {
    //     expect(err.message).toBe('Too many login attempts. Please try again later');
    //     done();
    //   }
    // });

     await expect(
      lastValueFrom(useCase.execute('user', '123456'))
    ).rejects.toThrow('Too many login attempts. Please try again later');
  });

  it('debe mapear errores 500+ a "service unavailable"', async(done) => {
    vi.mocked(mockRepository.signIn)
      .mockReturnValue(throwError(() => ({ status: 500 })));

    // useCase.execute('user', '123456').subscribe({
    //   error: (err) => {
    //     expect(err.message).toBe('Authentication service is temporarily unavailable');
    //     done();
    //   }
    // });
     await expect(
      lastValueFrom(useCase.execute('user', '123456'))
    ).rejects.toThrow('Authentication service is temporarily unavailable');
  });
});
