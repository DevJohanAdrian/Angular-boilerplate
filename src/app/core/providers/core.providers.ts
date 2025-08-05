import { Provider } from '@angular/core';

import {AUTH_REPOSITORY} from '@core/tokens/auth-repository.token';
import { AuthApiService } from '@infra/http/auth-api-service';

export const coreProviders: Provider[] = [
  {
    provide: AUTH_REPOSITORY,
    useClass: AuthApiService
  }
];