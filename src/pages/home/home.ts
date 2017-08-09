import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
// サンプルデータ
import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }

  // 詳細ページに遷移
  openDetailPage(userId, region, platform) {
    this.navCtrl.push(DetailPage, { userId: userId, region: region, platform: platform });
  }

  // TODO ローカルに保存されているユーザーIDからユーザー情報を取得するよう変更する
  // 以下はダミーデータ
  initializeItems() {
    this.items = [
      {
        'userInfo': NOANOA_1926,
        'userId': 'Noanoa-1926',
        'region': 'kr',
        'platform': 'pc'
      },
      {
        'userInfo': GAPPO3_1173,
        'userId': 'gappo3-1173',
        'region': 'kr',
        'platform': 'pc'
      },
      {
        'userInfo': HOSHIMI_11424,
        'userId': 'hoshimi-11424',
        'region': 'kr',
        'platform': 'pc'
      },
      {
        'userInfo': NOANOA_1926,
        'userId': 'Noanoa-1926',
        'region': 'kr',
        'platform': 'pc'
      },
      {
        'userInfo': GAPPO3_1173,
        'userId': 'gappo3-1173',
        'region': 'kr',
        'platform': 'pc'
      },
      {
        'userInfo': HOSHIMI_11424,
        'userId': 'hoshimi-11424',
        'region': 'kr',
        'platform': 'pc'
      },
    ];
  }


}
