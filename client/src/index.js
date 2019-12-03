import 'phaser';

import config from './assets/config';
import GameScene from './scenes/game';

const game = new Phaser.Game({
  width: config.width,
  height: config.height,
  scene: [GameScene],
  backgroundColor: config.window.backgroundColor,
  physics: {
    default: 'arcade',
    arcade: {
      debug: config.debug
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  autoRound: false,
  'render.transparent': true,
});

game.scene.start('game', {
  configFile: 'assets/states/game.yml',
  envs: config
});

