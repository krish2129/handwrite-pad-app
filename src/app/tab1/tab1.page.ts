import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { OCR, OCRSourceType } from '@awesome-cordova-plugins/ocr/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage-angular';

const STORAGE_KEY = 'DATA_LIST';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit{
  @ViewChild(SignaturePad) handwritingPad: SignaturePad;
  handwritingImg : string;
  signaturePadOptions: Object = { 
    'penColor': "rgb(66, 133, 244)",
    'minWidth': 2,
    'canvasWidth': 500,
    'canvasHeight': 300
  };
  private _storage: Storage | null = null;
  OCRAD: any;

  constructor(private ocr: OCR, private file: File,private storage: Storage,public loadingCtrl: LoadingController) {this.init();}

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }



  ngAfterViewInit() {
    // this.signaturePad is now available
    this.handwritingPad.set('minWidth', 2); // set szimek/signature_pad options at runtime
    this.handwritingPad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log('end drawing');
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  clearPad() {
    this.storage.clear();
    this.handwritingPad.clear();
    this.handwritingImg = ''
  }

  

  savePad() {
    this.handwritingImg = this.handwritingPad.toDataURL();
    let handwritingData = this.handwritingPad.toData();
    let strokeData = this.b64toArrayData(handwritingData)
    console.log(this.handwritingImg)
    this.fileSave(strokeData)
    this.getText(this.handwritingImg)
    this._storage.set(STORAGE_KEY, strokeData);
  }

  b64toArrayData(b64Data){
    let multiLine =''
    for (var i = 0; i < b64Data.length; i++) {
      let splitArray = b64Data[i]
      for (var k = 0; k < splitArray.length; k++) {
        let xCordinate = splitArray[k].x     //X co-ordinate value
        let yCordinate = splitArray[k].y    //Y co-ordinate value
        if(k==0)
          multiLine += xCordinate.toFixed(2) + " " + yCordinate.toFixed(2) + " " + 0 +'\n';
        else 
          multiLine += xCordinate.toFixed(2) + " " + yCordinate.toFixed(2) + " " + 1 +'\n';
      }
    }
    return multiLine;
    
  }

  fileSave(data){
    let name = new Date().getTime() + '.txt';
    let options: IWriteOptions = { replace: true };
    let externalDir = this.file.externalRootDirectory+'/Documents/';

    this.file.writeFile(externalDir, name, data, options).then(res => {
      console.log(res)
      // save content
    }, err => {
      console.log('error: ', err);
    });
  }

  getText(base64SignatureURL) {
    this.ocr.recText(OCRSourceType.BASE64, base64SignatureURL)
      .then((res) => {
        console.log(res);
        console.log(JSON.stringify(res));
        let recgtext = JSON.stringify(res);
        alert(recgtext)
       

      })
      .catch((error: any) => {
        console.error(error);
      }
  );
  }

}
