import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import overwatchJs from 'overwatch-js';
import { SEARCH_RESULT_INITIAL_DATA } from '../../assets/data/search-result-initial-data';
import { HeroesArrayService } from '../../utilities/heroes-array-service';
// サンプルデータ
import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [HeroesArrayService]
})
export class SearchPage {

  searchResult;
  heroesArray;
  region;
  platform;

  constructor(public navCtrl: NavController, private heroesArrayService: HeroesArrayService) {
    this.searchResult = SEARCH_RESULT_INITIAL_DATA;
    this.region = 'kr';
    this.platform = 'pc';
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
    // 検索ボタンを押すたびにサンプルデータが切り替わるYO
    if (this.searchResult.profile.nick == 'Noanoa'){
      this.searchResult = HOSHIMI_11424;
    } else if (this.searchResult.profile.nick == 'hoshimi') {
      this.searchResult = GAPPO3_1173;
    } else if (this.searchResult.profile.nick == 'gappo3') {
      this.searchResult = SEARCH_RESULT_INITIAL_DATA;
    } else {
      this.searchResult = NOANOA_1926;
    }

    // サービスを利用して、検索結果からヒーローの配列を成形する
    this.heroesArray = this.heroesArrayService.getHeroesArray(this.searchResult);
  }
}