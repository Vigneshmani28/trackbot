import { NgModule } from '@angular/core';
import { HasRoleDirective } from './Directives/has-role.directive';

@NgModule({
  declarations: [HasRoleDirective],
  exports: [HasRoleDirective]
})
export class SharedModule { }