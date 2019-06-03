import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesClienteMenuPage } from './pages-cliente-menu';

@NgModule({
  declarations: [
    PagesClienteMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesClienteMenuPage),
  ],
})
export class PagesClienteMenuPageModule {}
