import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {config} from './angular2auth.firebase' ;
import {AngularFireAuth} from 'angularfire2/auth' ;
import {AngularFireModule} from 'angularfire2' ;
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { HttpClientModule } from '@angular/common/http';
import { UsersProvider } from '../providers/users/users';
import { ImghandlerProvider } from '../providers/imghandler/imghandler'; 
import {FilePath} from '@ionic-native/file-path';
import {FileChooser} from '@ionic-native/file-chooser'

import { HttpModule } from '@angular/http';
import { LoginPageModule } from '../pages/login/login.module';
import { RequestsProvider } from '../providers/requests/requests';
@NgModule({
  declarations: [
    MyApp,
    


  ],
  
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:'top'}),
    AngularFireModule.initializeApp(config) ,
    HttpClientModule,
    HttpModule,
    LoginPageModule
  
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpClientModule,
    AuthProvider,
    AngularFireAuth,
    UsersProvider,
    ImghandlerProvider,
    FilePath,
    FileChooser,
    RequestsProvider
    
   
  ]
})
export class AppModule {}
