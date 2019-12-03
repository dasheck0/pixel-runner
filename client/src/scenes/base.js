import YAML from 'yamljs';
import { map } from 'lodash';

import * as prefabs from '../prefabs/index';

export default class BaseScene extends Phaser.Scene {
  constructor(key = 'default') {
    super({ key });
    this.key = key;
  }

  init(options) {
    this.envs = options.envs;

    if (!options.configFile) {
      throw new Error('There is no configFile for the scene');
    }

    this.config = YAML.load(options.configFile);
    if (!this.config) {
      throw new Error('There is no config for the scene');
    }
  }

  preload() {
    Object.keys(this.config.assets).forEach((key) => {
      const value = this.config.assets[key];

      if (value.type === 'image') {
        this.load.image(key, value.src);
      }

      if (value.type === 'audio') {
        this.load.audio(key, value.src);
      }

      if (value.type === 'scenePlugin') {
        if (!this.plugins.scenePlugins.includes(plugin => key)) {
          this.load.scenePlugin({
            key: key,
            url: value.url,
            sceneKey: value.sceneKey
          });
        }
      }

      if (value.type === 'plugin') {
        if (!this.plugins.plugins.find(plugin => plugin.key === key)) {
          this.load.plugin(key, value.url, true);
          this.plugins.install(key);
        }
      }
    });
  }

  create() {
    this.groups = {};

    Object.keys(this.config.groups).forEach((key, index) => {
      const name = this.config.groups[key];

      const group = this.add.group();
      group._zIndex = index;
      group.runChildUpdate = true;

      this.groups[name] = group;
    });

    this.prefabs = {};

    Object.keys(this.config.prefabs || {}).forEach((key) => {
      const value = this.config.prefabs[key];
      this.prefabs[key] = new (prefabs[value.type])(key, this, value.options, this.envs);
    });

    this.scenes = {};

    Object.keys(this.config.scenes || []).forEach((key) => {
      const name = this.config.scenes[key];
      const scene = this.scene.get(key);
      this.scene.launch(name, {
        configFile: `assets/states/${name}.yml`,
        envs: this.envs
      });

      this.scenes[name] = scene;
    });

    map(this.prefabs, (prefab) => {
      if (prefab.create) {
        prefab.create();
      }
    });
  }

  update(time, delta) {
  }
}
