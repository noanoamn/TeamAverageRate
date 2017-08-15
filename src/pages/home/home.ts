import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import { Storage } from '@ionic/storage';
// サンプルデータ
// import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
// import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
// import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.initializeItems();
  }

  // 詳細ページに遷移
  openDetailPage(userId, region, platform) {
    this.navCtrl.push(DetailPage, { userId: userId, region: region, platform: platform });
  }

  initializeItems() {
    this.items = new Array();
    // storage.forEach()でstorageに格納されているvalueとkeyの組み合わせをまわす
    this.storage.forEach((value, key) => {
      let userIdIndex = value.profile.url.lastIndexOf('/');
      let regionIndex = value.profile.url.lastIndexOf('/', userIdIndex - 1);
      let platformIndex = value.profile.url.lastIndexOf('/', regionIndex - 1);
      this.items.push({
        'userInfo': value,
        'userId': value.profile.url.slice(userIdIndex + 1),
        'region': value.profile.url.slice(regionIndex + 1, userIdIndex),
        'platform': value.profile.url.slice(platformIndex + 1, regionIndex)
      })
    });
    console.log(this.items);
  }


}
