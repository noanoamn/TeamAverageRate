import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import overwatchJs from 'overwatch-js';
// サンプルデータ
import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  searchResult;

  constructor(public navCtrl: NavController) {
    this.searchResult = NOANOA_1926;
  }

  // 詳細ページに遷移
  // TODO ユーザーのIDを引数とするメソッドに変更する
  openDetailPage() {
    this.navCtrl.push(DetailPage, {});
  }

  // 検索を行う
  getPlayerInfo(playerIdFirstPart, playerIdSecondPart) {
    // PlayerIDの前半部分と後半部分を結合する
    let playerId = playerIdFirstPart + '-' + playerIdSecondPart;

    // overwatch-jsの詳細情報取得メソッド
    // テストのため、固定値で取得
    // this.searchResult = overwatchJs.getAll('pc', 'kr', 'gappo3-1173').then(
    //   (data) => console.dir(data, {depth : 2, colors : true}) 
    //   );

    // サンプルデータから取得
    console.log(NOANOA_1926);
    this.searchResult = NOANOA_1926;
    console.log(this.searchResult);
  }
}