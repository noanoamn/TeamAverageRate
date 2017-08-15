import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import overwatchJs from 'overwatch-js';
import { USER_INFO_INITIAL_DATA } from '../../assets/data/user-info-initial-data';
import { HeroesArrayService } from '../../utilities/heroes-array-service';
import { Storage } from '@ionic/storage';
// サンプルデータ
// import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
// import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
// import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

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
  hasValidUserInfo: boolean;
  hasUserInList: boolean;

  constructor(public navCtrl: NavController, private heroesArrayService: HeroesArrayService, private chRef: ChangeDetectorRef, public loadingCtrl: LoadingController, private storage: Storage) {
    this.userInfo = USER_INFO_INITIAL_DATA;
    this.heroesArray = [];
    this.hasValidUserInfo = false;
    this.hasUserInList = false;
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

    let instance: SearchPage = this;
    // overwatch-jsの詳細情報取得メソッド
    overwatchJs.getAll(this.platform, this.region, playerId).then(
      (data) => {
        
        // 検索でヒットした場合、プレイヤー名をキーにしてストレージにデータを格納する
        // TODO addボタンを作ってこの処理を実装する
        instance.storage.set(data.profile.nick, data);
        console.log(data.profile.nick);

        instance.setUserInfo(data, instance.playerIdFirstPart, instance.playerIdSecondPart);
        instance.chRef.detectChanges();
        // ロードを非表示にする
        instance.loader.dismiss();
      }, (reason) => {
        instance.userInfo = USER_INFO_INITIAL_DATA;
        instance.heroesArray = [];
        instance.hasValidUserInfo = false;
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
  setUserInfo(userInfo, playerIdFirstPart, playerIdSecondPart) {
    this.userInfo = userInfo;
    // サービスを利用して、検索結果からヒーローの配列を成形する
    this.heroesArray = this.heroesArrayService.getHeroesArray(this.userInfo);
    // ユーザー情報が正しいかどうか確認し、ボタンを表示制御する
    this.hasValidUserInfo = this.checkUserInfoValid(userInfo, playerIdFirstPart, playerIdSecondPart);
  }

  // ローダーの作成
  createLoader() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30000
    });
  }

  // ユーザーの妥当性確認
  checkUserInfoValid(userInfo, playerIdFirstPart, playerIdSecondPart) {
    if (userInfo == USER_INFO_INITIAL_DATA || !playerIdFirstPart || !playerIdSecondPart) {
      return false;
    } else {
      let playerId = playerIdFirstPart + '-' + playerIdSecondPart;
      // リストに該当ユーザーがいるか確認
      this.hasUserInList = this.checkUserInList(playerId);
      return true;
    }
  }

  // リストに検索したユーザーが居るか確認する
  checkUserInList(playerId) {
    // TODO ローカルストレージに該当ユーザーが居るか確認する
    // ローカルストレージが実装されていないので、以下はテスト用コード
    if (this.hasUserInList) {
      return false;
    } else {
      return true;
    }
  }
}