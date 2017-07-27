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
  
  openDetailPage() {
    this.navCtrl.push(DetailPage, {});
  }

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
