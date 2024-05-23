import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

const primengModules = [ButtonModule , CardModule , DialogModule]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    primengModules,

  ],
  exports: [
    primengModules
  ],
})
export class PrimengModule { }
