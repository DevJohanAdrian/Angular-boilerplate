import { User } from "../entities/user.entity";

export interface AuthRepository {
  signIn(email: string, password: string): Promise<User>;
  signUp(name: string, email: string, password: string): Promise<User>;
  
}
