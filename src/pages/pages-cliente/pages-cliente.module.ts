import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesClientePage } from './pages-cliente';

@NgModule({
  declarations: [
    PagesClientePage,
  ],
  imports: [
    IonicPageModule.forChild(PagesClientePage),
  ],
})
export class PagesClientePageModule {}
