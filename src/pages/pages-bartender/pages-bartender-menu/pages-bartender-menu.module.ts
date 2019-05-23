import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BartenderMenuPage } from './pages-bartender-menu';

@NgModule({
  declarations: [
    BartenderMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(BartenderMenuPage),
  ],
})
export class BartenderMenuPageModule {}
