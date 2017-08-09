import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { USER_INFO_INITIAL_DATA } from '../../assets/data/user-info-initial-data';
import { HeroesArrayService } from '../../utilities/heroes-array-service';
import overwatchJs from 'overwatch-js';
// サンプルデータ
import { NOANOA_1926 } from '../../assets/sample-data/Noanoa-1926';
import { HOSHIMI_11424 } from '../../assets/sample-data/hoshimi-11424';
import { GAPPO3_1173 } from '../../assets/sample-data/gappo3-1173';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers: [HeroesArrayService]
})
export class DetailPage {

  userInfo;
  heroesArray;
  userId;
  region;
  platform;

  constructor(public navCtrl: NavController, private heroesArrayService: HeroesArrayService, navParams: NavParams) {
    this.userId = navParams.get("userId");
    this.region = navParams.get("region");
    this.platform = navParams.get("platform");

    // 機能拡張の可能性も考慮し、ユーザーIDを受けて詳細画面で詳細情報を取得する形とする。
    // this.userInfo = this.getUserInfo(userId, region, platform);

    // 空のユーザー情報
    this.userInfo = USER_INFO_INITIAL_DATA;

    console.log('userId:' + this.userId);

    // 以下はダミーデータ
    // TODO API実装後に消す
    switch (this.userId) {
      case 'Noanoa-1926':
        this.userInfo = NOANOA_1926;
        break;
      case 'gappo3-1173':
        this.userInfo = GAPPO3_1173;
        break;
      case 'hoshimi-11424':
        this.userInfo = HOSHIMI_11424;
        break;
    }

    // サービスを利用して、検索結果からヒーローの配列を成形する
    this.heroesArray = this.heroesArrayService.getHeroesArray(this.userInfo);
  }

  // パラメータを元にユーザー情報を取得する
  getUserInfo(userId, region, platform) {
    // APIでユーザー情報を取得する
    // overwatch-jsの詳細情報取得メソッド
    this.userInfo = overwatchJs.getAll(platform, region, userId).then((data) => {
      if (data) {
        // 取得したデータはローカルに保存する
        let dataSaved = this.saveUserInfoIntoLocalStorage(userId, region, platform, data);
        if (!dataSaved) {
          // ローカルに保存できなかった場合は異常系としてアラートを出す。
          // TODO 実装
        }
      }
      console.dir(data, { depth: 2, colors: true })
    });

    // TODO インターネット経由でUserInfoが取得できなかった場合は、ローカルストレージから取得する
    // if ('インターネット経由でとれなかったとき') {
    //   let userInfo = this.getUserInfoFromLocalStorage(platform, region, userId);
    //   if (userInfo) {
    //     this.userInfo;
    //   }
    // }
  }

  // ローカルストレージにユーザー情報一式を保存する
  saveUserInfoIntoLocalStorage(userId, region, platform, userInfo): Boolean {
    // TODO 実装
    return true;
  }

  // ローカルストレージからユーザー情報を取得する
  getUserInfoFromLocalStorage(platform, region, userId) {
    // TODO 実装
    // ローカルにない場合はUSER_INFO_INITIAL_DATAを取得する
    let userInfo = USER_INFO_INITIAL_DATA;

    // 以下はダミーのサンプルコード
    userInfo = NOANOA_1926;
    return userInfo;
  }
}
