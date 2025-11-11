/**
 * Entidad User con comportamiento de dominio
 * En Clean Architecture, las entidades deben contener lógica de negocio
 */
export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly roles: string[] = [],
    public readonly isActive: boolean = true,
    public readonly createdAt: Date = new Date()
  ) {
    this.validateEmail(email);
    this.validateName(name);
  }

  // Comportamiento de dominio: validaciones
  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validateName(name: string): void {
    if (!name || name.trim().length < 2) {
      throw new Error('Name must have at least 2 characters');
    }
  }

  // Comportamiento de dominio: lógica de negocio
  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  canAccess(requiredRoles: string[]): boolean {
    if (!this.isActive) return false;
    if (requiredRoles.length === 0) return true;
    return this.hasAnyRole(requiredRoles);
  }

  // Factory method para crear desde datos externos
  static fromApiResponse(data: any): User {
    return new User(
      data.id,
      data.name,
      data.email,
      data.roles || [],
      data.isActive ?? true,
      data.createdAt ? new Date(data.createdAt) : new Date()
    );
  }

    // Factory method para crear desde datos externos
  static dummyFromApiResponse(data: any): User {
    return new User(
      data.id,
      `${data.firstname} ${data.lastname}`,
      data.email,
      data.roles || [],
      data.isActive ?? true,
      data.createdAt ? new Date(data.createdAt) : new Date()
    );
  }


  // Método para serializar (útil para persistencia)
  toPlainObject(): any {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles,
      isActive: this.isActive,
      createdAt: this.createdAt.toISOString()
    };
  }
}
