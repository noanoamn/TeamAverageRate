import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import oversmash from 'oversmash';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  ow;

  constructor(public navCtrl: NavController) {
    this.ow = oversmash();
    this.ow.player('Noanoa-1926').then(player => {
      console.log(JSON.stringify(player))
    })
    // サポートヒーローのプレイヤースタッツ
    this.ow.playerStats('Noanoa-1926', 'kr', 'pc').then(player => {
      console.log(JSON.stringify(player))
    })
    // オフェンスヒーローのプレイヤースタッツ
    this.ow.playerStats('hoshimi-11424', 'kr', 'pc').then(player => {
      console.log(JSON.stringify(player))
    })
    // タンクヒーローのプレイヤースタッツ
    this.ow.playerStats('gappo3-1173', 'kr', 'pc').then(player => {
      console.log(JSON.stringify(player))
    })
  }

}
