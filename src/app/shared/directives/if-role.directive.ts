import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfRole]',
  standalone: true
})
export class IfRoleDirective {
  // private currentRole: string = 'guest'; // mock inicial, luego vendrá del AuthService

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appIfRole(allowedRoles: string[]) {
    this.viewContainer.clear();
     const currentRole = this.authService.getUserRole();

    if (allowedRoles.includes(this.currentRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
