import { Provider } from '@angular/core';

import { AuthRepository } from '@domain/interfaces/auth.repository';

export const infraProviders: Provider[] = [
  {
    provide: AuthRepository,
    useClass: AuthApiService
  }
];