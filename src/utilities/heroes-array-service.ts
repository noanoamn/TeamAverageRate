import { Injectable } from '@angular/core';
import { HERO_ARRAY_CONSTRUCTION_DATA } from '../assets/data/hero-array-construction-data';

@Injectable()
export class HeroesArrayService {
  getHeroesArray(searchResult): Array<Object> {
    let heroesArray = []

    // 取得データからヒーローの配列を作成
    for (var prop in searchResult.competitive.heroes) {
      let heroObject = searchResult.competitive.heroes[prop];
      heroObject.name = prop;
      heroObject.heroImage = this.getHeroImageName(prop).heroImageName;
      heroObject.heroName = this.getHeroImageName(prop).heroName;
      heroObject.games_played_sum = this.sumPlayedValue(heroObject.games_played, heroObject.games_won, heroObject.games_lost, heroObject.games_tied)
      heroesArray.push(searchResult.competitive.heroes[prop]);
    }
    console.log(heroesArray);
    return heroesArray;
  }

  // Nullはゼロに置き換える
  nullToZero(value) {
    if (!value) {
      return 0;
    } else {
      return value;
    }
  }

  // プレイ総数と、勝ち数、負け数、引き分け数をすべて加算する
  sumPlayedValue(games_played, games_won, games_lost, games_tied) {
    let sum = this.nullToZero(games_played)
      + this.nullToZero(games_won)
      + this.nullToZero(games_lost)
      + this.nullToZero(games_tied);
    return sum;
  }

  // ヒーロー名を受け取りアイコン画像ファイル名を返すメソッド
  getHeroImageName(name) {
    let heroName = '';
    let heroImageName = 'Icon-no-image.png';
    if (HERO_ARRAY_CONSTRUCTION_DATA[name].heroName && HERO_ARRAY_CONSTRUCTION_DATA[name].heroImageName) {
      heroName = HERO_ARRAY_CONSTRUCTION_DATA[name].heroName;
      heroImageName = HERO_ARRAY_CONSTRUCTION_DATA[name].heroImageName;
    }
    let returnValue = {
      'heroName': heroName,
      'heroImageName': heroImageName
    };
    return returnValue;
  }
}