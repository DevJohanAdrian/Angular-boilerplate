# AngularBoilerplate

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.





SignInComponent → SignInController (Presentation)
          ↓
AuthService (Application)
          ↓ 
SignInUseCase (Domain)
          ↓
AuthRepository (Domain Interface)
          ↓
AuthApiService (Infra)

infra

SignInController → usa AuthService.

AuthService → usa SignInUseCase.

SignInUseCase → usa AuthApiService.

AuthApiService → hace el HttpClient.post.


src/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts
│   ├── interceptors/
│   │   └── auth.interceptor.ts
│   ├── services/
│   │   └── token.service.ts
│   ├── providers/
│   │   └── core.providers.ts
│   ├── constants/
│   └── utils/


src/
 ├── app/
 │   ├── core/                # Guards, interceptors, providers
 │   ├── domain/              # Entidades, repositorios, casos de uso
 │   ├── application/         # Orquestación de casos de uso
 │   ├── infra/               # API calls, persistencia
 │   ├── shared/              # Directivas, pipes, componentes comunes
 │   ├── store/               # 👈 Aquí va NgRx (estado global UI)
 │   │    ├── auth/
 │   │    │    ├── actions/
 │   │    │    │    └── auth.actions.ts
 │   │    │    ├── reducers/
 │   │    │    │    └── auth.reducer.ts
 │   │    │    ├── effects/
 │   │    │    │    └── auth.effects.ts
 │   │    │    ├── selectors/
 │   │    │    │    └── auth.selectors.ts
 │   │    │    └── index.ts
 │   │    └── app.state.ts
 │   └── features/
 │        └── auth/           # Componentes/páginas de autenticación


src/
 ├── app/
 │   ├── core/              # Servicios transversales, providers, guards
 │   ├── domain/            # Entidades, interfaces, repositorios, casos de uso
 │   ├── application/       # Servicios que orquestan casos de uso
 │   ├── infra/             # Implementaciones concretas (APIs, storage, etc.)
 │   ├── shared/            # 👈 Pipes, directivas, componentes reutilizables
 │   │    ├── directives/
 │   │    │     └── if-role.directive.ts   # ejemplo
 │   │    ├── pipes/
 │   │    └── components/
 │   └── features/          # Módulos o páginas específicas (auth, dashboard, etc.)

 SignInUseCase
   ↓
AuthService (application)
   ↓
AuthApiService (infra/http)
   ↓
ApiService (core/http)
   ↓
HttpClient + Interceptors (core/interceptors)

Use Case (application) → Service (infra/http) → HttpClient (core/http + interceptors)




---------------------------------------------------------------------------------

Capa	Carpeta	Rol principal
Domain	domain/	Contiene las entidades, interfaces y casos de uso. Es el núcleo independiente de Angular.
Application (adapters)	application/adapters/	Contiene los servicios de aplicación que orquestan casos de uso e interactúan con la infraestructura.
Infrastructure	infra/	Implementa los detalles técnicos (HTTP, APIs, persistencia, etc).
Presentation	presentation/	Contiene componentes, vistas, controladores y modelos de UI.
Core	core/	Agrupa dependencias compartidas (guards, interceptores, providers, tokens…).
Shared	shared/	Reúne elementos reutilizables como directivas, pipes o componentes genéricos.
Store	store/	Implementa el estado global (NgRx o similar).
------------------------------------------------------------------------------------

UI / Presentation — presentation/views/pages/* (ej. sign-in.page)

El usuario llena el formulario y el componente (page) llama a su controller o a un dispatch de NgRx.

Ejemplo: this.signInController.signIn(email, password) o store.dispatch(signIn({ email, password })).

Controller (presentation/controllers/sign-in.controller.ts)

Actúa como adaptador entre la vista y la capa de aplicación/servicios.

Puede:

Llamar a AuthService (application) directamente; o

Despachar una action de NgRx (recomendado si usa store).

No conoce infra; solo usa servicios de aplicación o store.

Store (opcional, si usa NgRx) — store/actions, store/effects

Si la UI despacha signIn action:

effects/auth.effects escucha signIn y ejecuta efecto funcional o clase AuthEffects.

El efecto inyecta AuthService (o el caso de uso) y llama a authService.signIn(...).

El resultado dispara signInSuccess o signInFailure (actualiza reducers).

Selectors (selectors/auth.selectors.ts) exponen user, token, loading, error a la UI.

Application (application/adapters/services/auth.service.ts)

AuthService orquesta la operación. Sus responsabilidades:

Llamar al SignInUseCase (si se ha definido la capa de usecases).

Guardar/recuperar token (ej. saveToken(), getToken() — usa localStorage o una abstracción).

Exponer métodos para la presentación (ej. signIn, signOut, getToken).

Debe estar marcado @Injectable() para que Angular lo instancie.

Domain / UseCase (domain/usecases/sign-in.usecase.ts)

SignInUseCase recibe los parámetros y aplica la regla de negocio necesaria.

Depende de la abstracción AuthRepository (interfaz). EJEMPLO:

export class SignInUseCase {
  constructor(private readonly authRepo: AuthRepository) {}
  execute(email: string, password: string) {
    return this.authRepo.signIn(email, password);
  }
}


Importante: el usecase no conoce HttpClient ni detalles de infra.

Domain / Interface (domain/interfaces/auth.repository.ts)

Define el contrato:

export interface AuthRepository {
  signIn(email: string, password: string): Observable<User>;
  signUp(...): Observable<User>;
}


Es la abstracción que infra implementa.

Infra / HTTP (infra/http/auth-api-service.ts)

Implementa AuthRepository.

Usa HttpClient para comunicarse con el backend:

@Injectable()
export class AuthApiService implements AuthRepository {
  constructor(private http: HttpClient) {}
  signIn(email,password){ return this.http.post<User>(`${this.baseUrl}/sign-in`, {email,password}); }
}


No contiene lógica de negocio; solo transforma la llamada a la API.

Providers / Token binding (core/providers/auth.providers.ts o infra/providers)

Aquí se vincula la abstracción con la implementación para el inyector:

O bien con InjectionToken (core/tokens/auth-repository.token.ts) y provide:

{ provide: AUTH_REPOSITORY, useClass: AuthApiService }


O bien con el tipo/constructor directo:

{ provide: AuthRepository, useClass: AuthApiService }


Estos providers se importan/expand en app.config.ts.

Core / Http interceptors (core/http/interceptors/auth.interceptor.ts, error.interceptor.ts)

Se configuran globalmente mediante provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])) en app.config.ts.

auth.interceptor hace const token = authService.getToken() (AuthService debe exponer getToken) y añade Authorization header si existe.

error.interceptor captura errores HTTP globales (401, 500) y actúa (logout, reintento, mensaje).

HttpClient (registrado por provideHttpClient) → la petición sale con headers interceptados al backend.

Respuesta del backend → pasa por los interceptors de respuesta → llega a AuthApiService → se propaga hacia SignInUseCase → AuthService → Controller/Effect → UI (y store si aplica).

Guard (core/guards/auth.guard.ts)

Protege rutas mediante authService.getToken() o con un selector del store (selectIsAuthenticated).

Se registra en rutas (canActivate/canMatch) en app.routes.ts.