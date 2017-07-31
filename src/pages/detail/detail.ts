import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import oversmash from 'oversmash';
import { Http } from '@angular/http';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  ow;
  url;

  constructor(public navCtrl: NavController, http: Http) {
    this.ow = oversmash();
    this.ow.player('Noanoa-1926').then(player => {
      console.log(player)
    })
    // this.url = "https://owapi.net/api/v3/u/Noanoa-1926/blob";
    // http.get(url).success(function (data) {
    //   console.log(data);
    // });
  }

}
