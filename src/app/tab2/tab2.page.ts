import { OnInit, Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
const STORAGE_KEY = 'DATA_LIST';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {
  STORAGE_VAL:any;

  constructor(private storage: Storage) {}


  ionViewDidEnter(){
    this.storage.get(STORAGE_KEY).then((val) => {
      this.STORAGE_VAL= val;
    });
  }

}
