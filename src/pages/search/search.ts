import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import overwatchJs from 'overwatch-js';
import { USER_INFO_INITIAL_DATA } from '../../assets/data/user-info-initial-data';
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

  userInfo: any;
  heroesArray: any[];
  region: string;
  platform: string;
  playerIdFirstPart: string;
  playerIdSecondPart: number;

  constructor(public navCtrl: NavController, private heroesArrayService: HeroesArrayService) {
    this.userInfo = USER_INFO_INITIAL_DATA;
    this.heroesArray = [];
    this.region = 'kr';
    this.platform = 'pc';
  }

  // 検索を行う
  getPlayerInfo(playerIdFirstPart, playerIdSecondPart) {
    // 入力ボックスのどちらかが空の場合は検索を行わない
    if (!playerIdFirstPart || !playerIdSecondPart) {
      // アラート出そうかと思ったけど、うっとーしいのでやめたよ。
      this.userInfo = USER_INFO_INITIAL_DATA;
      return;
    }

    // PlayerIDの前半部分と後半部分を結合する
    let playerId = playerIdFirstPart + '-' + playerIdSecondPart;

    // overwatch-jsの詳細情報取得メソッド
    overwatchJs.getAll(this.platform, this.region, playerId).then(
      (data) => {
        this.userInfo = data;
        // サービスを利用して、検索結果からヒーローの配列を成形する
        this.heroesArray = this.heroesArrayService.getHeroesArray(this.userInfo);
        console.log('data');
        console.log(data);
        console.dir(data, { depth: 2, colors: true });
      }, (reason) => {
        this.userInfo = USER_INFO_INITIAL_DATA;
        this.heroesArray = [];
      }
    );

    // // サンプルデータから取得
    // // 検索ボタンを押すたびにサンプルデータが切り替わるYO
    // if (this.userInfo.profile.nick == 'Noanoa') {
    //   this.userInfo = HOSHIMI_11424;
    // } else if (this.userInfo.profile.nick == 'hoshimi') {
    //   this.userInfo = GAPPO3_1173;
    // } else if (this.userInfo.profile.nick == 'gappo3') {
    //   this.userInfo = USER_INFO_INITIAL_DATA;
    // } else {
    //   this.userInfo = NOANOA_1926;
    // }
  }
}