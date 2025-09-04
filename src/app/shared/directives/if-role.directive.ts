import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfRole]',
  standalone: true
})
export class IfRoleDirective {
  private currentRole: string = 'guest'; // mock inicial, luego vendrá del AuthService

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef, 
    private authService: AuthService 
  ) {}

  @Input() set appIfRole(allowedRoles: string[]) {
    this.viewContainer.clear();
     this.currentRole = this.authService.getUserRole();

    if (allowedRoles.includes(this.currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
