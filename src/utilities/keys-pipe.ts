import { PipeTransform, Pipe } from '@angular/core';

// 以下を参考に作成
// https://stackoverflow.com/questions/35534959/access-key-and-value-of-object-using-ngfor
// http://blog.yuhiisk.com/archive/2016/05/26/angular2-custom-pipe.html
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    // プレイ数順にソートを行う
    let ctrl = this;
    keys.sort(function(a,b){
      let aSum = ctrl.sumPlayedValue(value[a].games_played, value[a].games_won, value[a].games_lost, value[a].games_tied)
      let bSum = ctrl.sumPlayedValue(value[b].games_played, value[b].games_won, value[b].games_lost, value[b].games_tied)
      if(aSum > bSum) return -1;
      if(aSum < bSum) return 1;
      return 0;
    });
    return keys;
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
}