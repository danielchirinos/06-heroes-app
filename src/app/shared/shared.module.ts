import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { LayoutSharedComponent } from './pages/layout/layout-shared/layout-shared.component';
import { MaterialModule } from '../material/material.module';
import { SharedRoutingModule } from './shared-rounting.module';



@NgModule({
  declarations: [
    Error404PageComponent,
    LayoutSharedComponent
  ],
  imports: [ MaterialModule, CommonModule, SharedRoutingModule ],
  exports: [ Error404PageComponent  ]
})
export class SharedModule { }
