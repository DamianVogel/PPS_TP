import { HttpClient, HttpClientModule } from '@angular/common/http';

import { ErrorHandler, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { QRScanner } from '@ionic-native/qr-scanner';
import { NativeAudio } from '@ionic-native/native-audio';
//Movimiento
import { Shake } from '@ionic-native/shake';
import { DeviceMotion } from '@ionic-native/device-motion';

import { IonicStorageModule, Storage } from '@ionic/storage';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings, User, Api } from '../providers';
import { MyApp } from './app.component';

import { environment } from '../environments/environment';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

import { PagesModalPage } from "../pages/pages-modal/pages-modal";
import { SpinnerPage } from '../pages/pages-spinner/pages-spinner';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp,
    PagesModalPage,
    SpinnerPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PagesModalPage,
    SpinnerPage
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    QRScanner,
    NativeAudio,
    Shake,
    DeviceMotion,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }