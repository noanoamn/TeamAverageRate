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
  region;
  platform;

  constructor(public navCtrl: NavController) {
    this.searchResult = NOANOA_1926;
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
    this.searchResult = NOANOA_1926;
    this.heroesArray = [];
    for(var prop in this.searchResult.competitive.heroes){
      let heroObject = this.searchResult.competitive.heroes[prop];
      heroObject.name = prop;
      heroObject.heroImage = this.getHeroImageName(prop).heroImageName;
      heroObject.heroName = this.getHeroImageName(prop).heroName;
      heroObject.games_played_sum = this.sumPlayedValue(heroObject.games_played, heroObject.games_won, heroObject.games_lost, heroObject.games_tied)
      this.heroesArray.push(this.searchResult.competitive.heroes[prop]);
    }
    console.log(this.heroesArray);
  }

  // Nullはゼロに置き換える
  nullToZero(value){
    if(!value){
      return 0;
    }else{
      return value;
    }
  }

  // プレイ総数と、勝ち数、負け数、引き分け数をすべて加算する
  sumPlayedValue(games_played, games_won, games_lost, games_tied){
    let sum = this.nullToZero(games_played)
      + this.nullToZero(games_won)
      + this.nullToZero(games_lost)
      + this.nullToZero(games_tied);
    return sum;
  }

  // ヒーロー名を受け取りアイコン画像ファイル名を返すメソッド
  getHeroImageName(name) {
    let returnValue = {
      'heroName': '',
      'heroImageName': ''
    };
    switch (name) {
      case 'ana':
        returnValue.heroName = 'Ana';
        returnValue.heroImageName = 'Icon-ana.png';
        break;
      case 'bastion':
        returnValue.heroName = 'Bastion';
        returnValue.heroImageName = 'Icon-bastion.png';
        break;
      case 'doomfist':
        returnValue.heroName = 'Doomfist';
        returnValue.heroImageName = 'Icon-doomfist.png';
        break;
      case 'd.va':
        returnValue.heroName = 'D.Va';
        returnValue.heroImageName = 'Icon-dva.png';
        break;
      case 'genji':
        returnValue.heroName = 'Genji';
        returnValue.heroImageName = 'Icon-genji.png';
        break;
      case 'hanzo':
        returnValue.heroName = 'Hanzo';
        returnValue.heroImageName = 'Icon-hanzo.png';
        break;
      case 'junkrat':
        returnValue.heroName = 'Junkrat';
        returnValue.heroImageName = 'Icon-Junkrat.png';
        break;
      case 'lúcio':
        returnValue.heroName = 'Lúcio';
        returnValue.heroImageName = 'Icon-Lucio.png';
        break;
      case 'mccree':
        returnValue.heroName = 'McCree';
        returnValue.heroImageName = 'Icon-mccree.png';
        break;
      case 'mei':
        returnValue.heroName = 'Mei';
        returnValue.heroImageName = 'Icon-mei.png';
        break;
      case 'mercy':
        returnValue.heroName = 'Mercy';
        returnValue.heroImageName = 'Icon-mercy.png';
        break;
      case 'orisa':
        returnValue.heroName = 'Orisa';
        returnValue.heroImageName = 'Icon-orisa.png';
        break;
      case 'pharah':
        returnValue.heroName = 'Pharah';
        returnValue.heroImageName = 'Icon-pharah.png';
        break;
      case 'reaper':
        returnValue.heroName = 'Reaper';
        returnValue.heroImageName = 'Icon-reaper.png';
        break;
      case 'reinhardt':
        returnValue.heroName = 'Reinhardt';
        returnValue.heroImageName = 'Icon-reinhardt.png';
        break;
      case 'roadhog':
        returnValue.heroName = 'Roadhog';
        returnValue.heroImageName = 'Icon-Roadhog.png';
        break;
      case 'soldier:_76':
        returnValue.heroName = 'Soldier: 76';
        returnValue.heroImageName = 'Icon-Soldier76.png';
        break;
      case 'sombra':
        returnValue.heroName = 'Sombra';
        returnValue.heroImageName = 'Icon-sombra.png';
        break;
      case 'symmetra':
        returnValue.heroName = 'Symmetra';
        returnValue.heroImageName = 'Icon-symmetra.png';
        break;
      case 'torbjörn':
        returnValue.heroName = 'Torbjörn';
        returnValue.heroImageName = 'Icon-torbjorn.png';
        break;
      case 'tracer':
        returnValue.heroName = 'Tracer';
        returnValue.heroImageName = 'Icon-tracer.png';
        break;
      case 'widowmaker':
        returnValue.heroName = 'Widowmaker';
        returnValue.heroImageName = 'Icon-widowmaker.png';
        break;
      case 'winston':
        returnValue.heroName = 'Winston';
        returnValue.heroImageName = 'Icon-winston.png';
        break;
      case 'zarya':
        returnValue.heroName = 'Zarya';
        returnValue.heroImageName = 'Icon-zarya.png';
        break;
      case 'zenyatta':
        returnValue.heroName = 'Zenyatta';
        returnValue.heroImageName = 'Icon-zenyatta.png';
        break;
      default:
        // マッチしない場合に入れる画像を用意する必要あり
        break;
    }
    return returnValue;
  }
}