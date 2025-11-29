import { describe, it, expect, vi } from 'vitest';
import { authInterceptor } from '@core/http/interceptors/auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@application/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  const mockAuthService = {
    getToken: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('NO debe agregar Authorization si no existe token', () => {
    mockAuthService.getToken.mockReturnValue(null);

    http.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');
    expect(req.request.headers.has('Authorization')).toBe(false);

    req.flush({});
  });

  it('Debe agregar el header Authorization cuando hay token', () => {
    mockAuthService.getToken.mockReturnValue('TEST_TOKEN');

    http.get('/api/test').subscribe();

    const req = httpMock.expectOne('/api/test');

    expect(req.request.headers.get('Authorization')).toBe('Bearer TEST_TOKEN');

    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});
