import { User } from "../entities/user.entity";
import { Observable } from 'rxjs';


// export interface AuthRepository {
//   signIn(email: string, password: string): Promise<User>;
//   signUp(name: string, email: string, password: string): Promise<User>;
  
// }

export abstract class AuthRepository {
  abstract signIn(email: string, password: string): Observable<User>;
}