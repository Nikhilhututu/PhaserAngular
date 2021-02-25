import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import GameScene from '../../assets/js/GamePlay';
import { MenuService } from '../services/menu-service.service';

export class InitScene extends Phaser.Scene {
      
  menuItems = [];
  constructor() {
    super({ key:'InitScene'});
  }
  preload() {
    // this.load.setBaseURL('');
    console.log(" !!!InitPreload!!! ");
  }

  create() {
    console.log(" !!!InitCreate!!! ");
      this.scene.start('GameScene');
      // this.scene.add('GameScene', LogoScene, true);
  }
  
}
// export default {InitScene};
@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

    mGame:any; 
    constructor() { 
       GameScene.mListData = GetMenuIten();
       console.log(GameScene.mListData.length);
    }
    ngOnInit(): void {
      this.mGame = new Phaser.Game(GameConfig);
      console.log(GameConfig+"  #############     ");
    }
   
}
function GetMenuIten() {
   let service = new MenuService();
   return service.getMenu();
 }
let maxX=1920;
let maxY=1080;
let GameConfig = {
  type: Phaser.CANVAS, //WEBGL CANVAS
  width: maxX,
  height:maxY,
  scene:[InitScene,GameScene],
  audio: {
        disableWebAudio: false
    },
  scale: {
        mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    orientation: Phaser.Scale.Orientation.LANDSCAPE, //PORTRAIT LANDSCAPE
  },
  fps: {
    target: 60,
    min: 60,
    forceSetTimeOut: false
  }
};


