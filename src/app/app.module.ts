import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { OCR } from '@awesome-cordova-plugins/ocr/ngx';
import { File } from '@ionic-native/file/ngx';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, SignaturePadModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot()],
  providers: [OCR,File,Storage,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
