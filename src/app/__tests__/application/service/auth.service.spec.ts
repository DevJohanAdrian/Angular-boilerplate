import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '@application/services/auth.service';
import { TokenStorageRepository } from '@domain/interfaces/token-storage.repository';

describe('AuthService', () => {
  let service: AuthService;
  let mockTokenStorage: vi.Mocked<TokenStorageRepository>;

  beforeEach(() => {
    mockTokenStorage = {
      saveToken: vi.fn(),
      getToken: vi.fn(),
      clearToken: vi.fn(),
      hasValidToken: vi.fn(),
    };

    service = new AuthService(mockTokenStorage);
  });

  it('debe guardar el token usando el repositorio', () => {
    service.saveToken('ABC123');
    expect(mockTokenStorage.saveToken).toHaveBeenCalledWith('ABC123');
  });

  it('debe obtener el token desde el repositorio', () => {
    mockTokenStorage.getToken.mockReturnValue('XYZ789');

    const token = service.getToken();

    expect(token).toBe('XYZ789');
    expect(mockTokenStorage.getToken).toHaveBeenCalled();
  });

  it('debe limpiar el token usando el repositorio', () => {
    service.clearToken();
    expect(mockTokenStorage.clearToken).toHaveBeenCalled();
  });

  it('debe verificar autenticación usando el repositorio', () => {
    mockTokenStorage.hasValidToken.mockReturnValue(true);

    const result = service.isAuthenticated();

    expect(result).toBe(true);
    expect(mockTokenStorage.hasValidToken).toHaveBeenCalled();
  });
});
