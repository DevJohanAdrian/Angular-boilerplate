import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authGuard } from '@core/guards/auth.guard';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@application/services/auth.service';
vi.mock('@angular/core', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // 👈 conserva todo Angular
    inject: vi.fn(), // 👈 reemplaza solo inject()
  };
});
describe('authGuard', () => {
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: vi.fn(),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    (inject as any).mockImplementation((token: any) => {
      if (token === AuthService) return authServiceMock;
      if (token === Router) return routerMock;
      throw new Error('Token desconocido en inject');
    });
  });

  it('should allow route activation when user is authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);

    const result = authGuard({} as any, [{ path: 'dashboard' }] as any);

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to sign-in when user is not authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    const result = authGuard({} as any, [{ path: 'dashboard' }] as any);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/sign-in'], {
      queryParams: { redirectTo: '/dashboard' },
    });

    expect(result).not.toBe(true);
  });
});
