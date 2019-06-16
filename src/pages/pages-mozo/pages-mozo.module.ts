import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesMozoPage } from './pages-mozo';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    PagesMozoPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(PagesMozoPage),
  ],
})
export class PagesMozoPageModule {}
