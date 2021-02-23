import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import GameScene from '../../assets/js/GamePlay';
let mGame :any; 
export class InitScene extends Phaser.Scene {
      
      maxX=1920;
      maxY=1080;
      GameConfig = {
        type: Phaser.CANVAS, //WEBGL CANVAS
        width: this.maxX,
        height: this.maxY,
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
  constructor() {
    super({ key:'InitScene'});
  }

  preload() {
    // this.load.setBaseURL('');
    console.log("preloaad");
  }

  create() {
      console.log("create");
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

  // phaserGame: Phaser.Game;
  // config: Phaser.Types.Core.GameConfig;
  
  constructor() { 
    console.log("@@@ 11111 @@@ ");
  }

  ngOnInit(): void {
    let mInitscene = new InitScene();
    
    // GameScene.mGame = this.phaserGame = new Phaser.Game(this.config);
    mGame = new Phaser.Game(mInitscene.GameConfig);
    console.log(mInitscene.GameConfig+"       ");
  }

}




