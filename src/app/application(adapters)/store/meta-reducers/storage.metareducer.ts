


 import { ActionReducer, INIT } from '@ngrx/store';
import { AppState } from '../reducers/index';

// Meta-reducer para persistir el slice "auth"
export function storageMetaReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {

  return function (state, action): AppState {

    // Restaurar "auth" al iniciar la app
    if (action.type === INIT) {
      const savedAuth = sessionStorage.getItem('authState');

      if (savedAuth) {
        try {
          state = {
            ...state,
            auth: JSON.parse(savedAuth),
          };
        } catch (err) {
          console.warn('Error al cargar authState desde localStorage', err);
        }
      }
    }

    // Ejecutar el reducer normal
    const nextState = reducer(state, action);

    
//      //  Guardar el nuevo estado en localStorage
//     //localStorage.setItem('appState', JSON.stringify(nextState));

    // Guardar solo el slice auth
    sessionStorage.setItem('authState', JSON.stringify(nextState.auth));

    return nextState;
  };
}
