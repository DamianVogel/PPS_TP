import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';
import { CocineroMenuPage } from './pages-cocinero-menu';

@NgModule({
  declarations: [
    CocineroMenuPage
  ],
  imports: [
    IonicPageModule.forChild(CocineroMenuPage),
  ]
})
export class CocineroMenuPageModule {}
