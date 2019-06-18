import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesMozoPage } from './pages-mozo';
import { DirectivesModule } from '../../directives/directives.module';
import { IonicModule } from 'ionic-angular/module';
@NgModule({
  declarations: [
    PagesMozoPage,
  ],
  imports: [
    DirectivesModule,
    IonicModule,
    IonicPageModule.forChild(PagesMozoPage),
  ],
})
export class PagesMozoPageModule {}
