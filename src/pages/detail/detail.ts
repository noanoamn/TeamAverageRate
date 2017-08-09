import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// サンプルデータ
import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  userInfo;
  heroesArray;

  constructor(public navCtrl: NavController) {
    // this.ow = oversmash();
    // this.ow.player('Noanoa-1926').then(player => {
    //   console.log(JSON.stringify(player))
    // })
    // // サポートヒーローのプレイヤースタッツ
    // this.ow.playerStats('Noanoa-1926', 'kr', 'pc').then(player => {
    //   console.log(JSON.stringify(player))
    // })
    // // オフェンスヒーローのプレイヤースタッツ
    // this.ow.playerStats('hoshimi-11424', 'kr', 'pc').then(player => {
    //   console.log(JSON.stringify(player))
    // })
    // // タンクヒーローのプレイヤースタッツ
    // this.ow.playerStats('gappo3-1173', 'kr', 'pc').then(player => {
    //   console.log(JSON.stringify(player))
    // })
  }

}
