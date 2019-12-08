import Sprite from '../base/sprite';

export default class Player extends Sprite {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);


    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.canJump = true;
    this.jumping = false;

    this.canDoubleJump = false;
    this.doubleJumping = false;

    this.oldDirection = true;

    this.playerType = 'NinjaFrog';

    this.movementSpeed = 200;

    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers(`${this.playerType}Idle`, { start: 0, end: 11 }),
      frameRate: 20,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers(`${this.playerType}Run`, { start: 0, end: 12 }),
      frameRate: 15,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'wallJump',
      frames: this.scene.anims.generateFrameNumbers(`${this.playerType}WallJump`, { start: 0, end: 5 }),
      frameRate: 15,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'hit',
      frames: this.scene.anims.generateFrameNumbers(`${this.playerType}Hit`, { start: 0, end: 5 }),
      frameRate: 15,
      repeat: 0
    });

    this.scene.anims.create({
      key: 'doubleJump',
      frames: this.scene.anims.generateFrameNumbers(`${this.playerType}DoubleJump`, { start: 0, end: 6 }),
      frameRate: 15,
      repeat: 0
    });

    this.on('animationcomplete', function (animation, frame) {
      this.setTexture(`${this.playerType}Jump`);
    }, this);

    this.setGravity(0, this.envs.game.gravity);

    this.healthBar = this.scene.add.easyProgressbar(100, 100, 64, 12, {
      color: 0xaf7159,
      padding: 1,
      radius: 2,
      progress: 0.5,
      text: {
        enabled: true,
        format: progress => `HP: ${Math.trunc(progress * 100)}`,
        align: {
          x: 'center',
          y: 'start'
        },
        origin: {
          x: 0.5,
          y: 0.6
        },
        style: {
          fontFamily: 'mini-square',
          fontSize: '12px',
          shadow: {
            offsetX: 2,
            offsetY: 2,
            color: '#000000',
            blur: 0,
            stroke: false,
            fill: true
          }
        }
      }
    });
  }

  idle() {
    if (this.jumping || this.doubleJumping) {
      return;
    }

    this.anims.play('idle', true);
  }

  run() {
    if (this.jumping || this.doubleJumping) {
      return;
    }

    this.anims.play('run', true);
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.canJump = false;
      this.canDoubleJump = true;

      this.setVelocityY(-this.envs.game.gravity / 2);
      this.anims.stop();
      this.setTexture(`${this.playerType}Jump`);
    }
  }

  wallJump() {
    this.anims.play('wallJump', true);
    this.setGravity(0, 50);
  }

  hit() {
    this.anims.play('hit', true);
  }

  doubleJump() {
    if (!this.doubleJumping) {
      this.doubleJumping = true;
      this.canDoubleJump = false;
      this.setVelocityY(-this.envs.game.gravity / 2);
      this.anims.play('doubleJump', true);
    }
  }

  flip() {
    this.setFlipX(!this.flipX);
  }

  update(time, delta) {
    super.update(time, delta);

    //this.healthBar.setPosition(this.x - 16, this.y - 32 * 0.75);

    this.setFlipX(this.oldDirection);
    this.setVelocityX(0);

    if (this.body.blocked.down) {
      this.canJump = true;
      this.jumping = false;
      this.doubleJumping = false;
    }

    if (this.cursors.left.isDown) {
      this.run();
      this.setVelocityX(-this.movementSpeed);
      this.oldDirection = true;
    } else if (this.cursors.right.isDown) {
      this.run();
      this.setVelocityX(this.movementSpeed);

      this.oldDirection = false;
    } else {
      this.idle();
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.canJump) {
        this.jump();
      } else if (this.canDoubleJump) {
        this.doubleJump();
      }
    }
  }
}
