import { errorInterceptor } from '@core/http/interceptors/error.interceptor';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, firstValueFrom } from 'rxjs';
import { createEnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';

// ---------- MOCK DEL ROUTER ----------
const navigateMock = vi.fn();

class MockRouter {
  navigate = navigateMock;
}

describe('errorInterceptor', () => {
  let injector;

  beforeEach(() => {
    vi.clearAllMocks();

    injector = createEnvironmentInjector([
      { provide: MockRouter, useClass: MockRouter },
      // 👇 Esta línea es CRÍTICA:
      { provide: Router, useExisting: MockRouter },
    ]);
  });

  const makeError = (status: number) =>
    new HttpErrorResponse({ status, error: 'TEST ERROR' });

  it('debería redirigir al /sign-in cuando el error es 401', async () => {
    const error = makeError(401);
    const next = vi.fn(() => throwError(() => error));

    await expect(
      firstValueFrom(
        runInInjectionContext(injector, () =>
          errorInterceptor({} as any, next)
        )
      )
    ).rejects.toThrow();

    expect(navigateMock).toHaveBeenCalledWith(['/sign-in']);
  });

  it('debería loggear error 403', async () => {
    const error = makeError(403);
    const next = vi.fn(() => throwError(() => error));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      firstValueFrom(
        runInInjectionContext(injector, () =>
          errorInterceptor({} as any, next)
        )
      )
    ).rejects.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      'No tienes permisos para esta acción'
    );
  });

  it('debería loggear error 500', async () => {
    const error = makeError(500);
    const next = vi.fn(() => throwError(() => error));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      firstValueFrom(
        runInInjectionContext(injector, () =>
          errorInterceptor({} as any, next)
        )
      )
    ).rejects.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error interno del servidor'
    );
  });

  it('debería loggear error por defecto', async () => {
    const error = makeError(418);
    const next = vi.fn(() => throwError(() => error));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(
      firstValueFrom(
        runInInjectionContext(injector, () =>
          errorInterceptor({} as any, next)
        )
      )
    ).rejects.toThrow();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error HTTP:',
      error
    );
  });
});
