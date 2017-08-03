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
  heroesArray;

  constructor(public navCtrl: NavController) {
    this.searchResult = NOANOA_1926;
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
    this.searchResult = NOANOA_1926;
    this.heroesArray = [];
    for(var prop in this.searchResult.competitive.heroes){
      let heroObject = this.searchResult.competitive.heroes[prop];
      heroObject.name = prop;
      heroObject.heroImage = this.getHeroImageName(prop);
      this.heroesArray.push(this.searchResult.competitive.heroes[prop]);
    }
    console.log(this.heroesArray);
  }

  // ヒーロー名を受け取りアイコン画像ファイル名を返すメソッド
  getHeroImageName(name) {
    let returnValue = "";
    switch (name) {
      case "lúcio":
        returnValue = "Icon-Lucio.png";
        break;
      default:
        // マッチしない場合に入れる画像を用意する必要あり
        break;
    }
    return returnValue;
  }
}