import 'phaser';
import EasyProgressbarPlugin from 'phaser3-plugin-easyprogressbar';

import config from './assets/config';
import GameScene from './scenes/game';

const game = new Phaser.Game({
  width: config.width,
  height: config.height,
  scene: [GameScene],
  backgroundColor: config.window.backgroundColor,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: config.debug
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  autoRound: false,
  'render.transparent': true,
  plugins: {
    global: [{
      key: 'EasyProgressbarPlugin',
      plugin: EasyProgressbarPlugin,
      start: true
    }]
  }
});

console.log("Starting scene game");

game.scene.start('game', {
  configFile: 'assets/states/game.yml',
  envs: config
});

