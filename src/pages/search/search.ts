import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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
  loader: any;

  constructor(public navCtrl: NavController, private heroesArrayService: HeroesArrayService, private chRef: ChangeDetectorRef, public loadingCtrl: LoadingController) {
    this.userInfo = USER_INFO_INITIAL_DATA;
    this.heroesArray = [];
    this.region = 'kr';
    this.platform = 'pc';
    this.createLoader();
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
    // ロードを表示する
    this.createLoader();
    this.loader.present();

    let instance : SearchPage = this;
    // overwatch-jsの詳細情報取得メソッド
    overwatchJs.getAll(this.platform, this.region, playerId).then(
      (data) => {
        instance.setUserInfo(data);
        instance.chRef.detectChanges();
        console.log('data');
        console.log(data);
        console.dir(data, { depth: 2, colors: true });
        // ロードを非表示にする
        instance.loader.dismiss();
      }, (reason) => {
        instance.userInfo = USER_INFO_INITIAL_DATA;
        instance.heroesArray = [];
        instance.chRef.detectChanges();
        // ロードを非表示にする
        instance.loader.dismiss();
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

  // ユーザー情報を出して、その情報を元にヒーローの配列を整形する
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    // サービスを利用して、検索結果からヒーローの配列を成形する
    this.heroesArray = this.heroesArrayService.getHeroesArray(this.userInfo);
  }

  // ローダーの作成
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
  }
}