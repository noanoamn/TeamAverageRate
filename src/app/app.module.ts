import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// ストレージ
import { IonicStorageModule } from '@ionic/storage';
// 画面
import { SearchPage } from '../pages/search/search';
import { DetailPage } from '../pages/detail/detail';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// カスタムパイプ
import { OrderByPipe } from '../utilities/order-by-pipe';
import { NullToZeroPipe } from '../utilities/null-to-zero-pipe';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    SearchPage,
    DetailPage,
    HomePage,
    TabsPage,
    OrderByPipe,
    NullToZeroPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchPage,
    DetailPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
