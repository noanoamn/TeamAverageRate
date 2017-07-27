import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items;

  constructor(public navCtrl: NavController) {
    this.initializeItems();
  }
  
  // 詳細ページに遷移
  // TODO ユーザーのIDを引数とするメソッドに変更する
  openDetailPage() {
    this.navCtrl.push(DetailPage, {});
  }

  // TODO ローカルに保存されているユーザーIDからユーザー情報を取得するよう変更する
  initializeItems() {
    this.items = [
      {'userName':'User1'},
      {'userName':'User2'},
      {'userName':'User3'},
      {'userName':'User4'},
      {'userName':'User5'},
      {'userName':'User6'},
    ];
  }


}
