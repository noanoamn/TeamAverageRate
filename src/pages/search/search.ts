import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';
import oversmash from 'oversmash';
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

  items;
  searchResult;
  ow;
  owjs;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
    console.log(this.items);
    this.searchResult = {};
  }

  // 詳細ページに遷移
  // TODO ユーザーのIDを引数とするメソッドに変更する
  openDetailPage() {
    this.navCtrl.push(DetailPage, {});
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  // 検索を行う
  getPlayerInfo(playerIdFirstPart, playerIdSecondPart) {
    // PlayerIDの前半部分と後半部分を結合する
    let playerId = playerIdFirstPart + '-' + playerIdSecondPart;
    // 検索文字列を引数としてプレイヤースタッツを取得
    this.ow = oversmash();
    this.owjs = overwatchJs.search('Noanoa-1926').then((data) => console.dir(data, {depth : 2, colors : true}) );

    // 仮でユーザー指定して検索
    // this.ow.playerStats('Noanoa-1926', 'kr', 'pc').then(player => {
    //   console.log(JSON.stringify(player))
    //   this.searchResult = player;
    // });

    // サンプルデータから取得
    console.log(NOANOA_1926);
    this.searchResult = NOANOA_1926;
    console.log(this.searchResult);
  }
}