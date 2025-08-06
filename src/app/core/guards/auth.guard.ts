import type { CanMatchFn } from '@angular/router';

export const authGuardGuard: CanMatchFn = (route, segments) => {
  return true;
};
