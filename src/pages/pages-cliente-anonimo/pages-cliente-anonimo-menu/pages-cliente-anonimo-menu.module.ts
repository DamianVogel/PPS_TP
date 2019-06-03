import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesClienteAnonimoMenuPage } from './pages-cliente-anonimo-menu';

@NgModule({
  declarations: [
    PagesClienteAnonimoMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesClienteAnonimoMenuPage),
  ],
})
export class PagesClienteAnonimoMenuPageModule {}
