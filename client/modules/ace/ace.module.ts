import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { AceDirective } from './ace.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AceDirective
  ],
  exports: [
    AceDirective
  ]
})
export class AceModule { }