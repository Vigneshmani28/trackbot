import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Role } from '../model/user';
import { AuthService } from '../services/auth-service/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  private userRoles: Role[] = [];

  constructor(
    private authService:AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ){}

  @Input() set appHasRole(allowedRoles: string | string[]){
    this.userRoles = this.authService.user?.role || [];
    console.log('allowedRoles', allowedRoles);
    console.log('userssssss role', this.userRoles);
    console.log('boolean', this.userRoles.some(role => allowedRoles.includes(role)));
    
    const rolesToCheck = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (this.userRoles.some(role => rolesToCheck.includes(role))) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
