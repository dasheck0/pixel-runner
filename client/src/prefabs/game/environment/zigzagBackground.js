import Background from "./background";

export default class StripeBackground extends Background {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.zigZagCount = 7;
    this.zigZagPeakCount = 5;
    this.zigZagHeight = 25;

    this.offset = 0;

    this.tween = this.scene.tweens.add({
      targets: this,
      props: {
        offset: { from: 0, to: 2 * this.envs.height / this.zigZagCount },
      },
      ease: 'Linear',
      duration: this.animationDuration * 2,
      repeat: -1,
    });
  }

  draw() {
    this.graphics.clear();

    const rect = new Phaser.Geom.Rectangle(0, 0, this.envs.width, this.envs.height);
    this.graphics.fillStyle(this.color0, 1);
    this.graphics.fillRectShape(rect);

    const step = this.envs.height / this.zigZagCount;
    for (let i = -1; i < this.zigZagCount + 2; i += 1) {
      this.graphics.beginPath();
      const currentHeight = (i + 1) * step - this.offset;
      this.graphics.moveTo(0, currentHeight);

      for (let x = 1; x <= this.zigZagPeakCount * 2; x += 1) {
        this.graphics.lineTo(x * (this.envs.width / (this.zigZagPeakCount * 2)), currentHeight - ((x % 2 === 0) ? 0 : step));
      }

      this.graphics.lineTo(this.envs.width, currentHeight + this.zigZagHeight);

      for (let x = this.zigZagPeakCount * 2; x >= 0; x -= 1) {
        this.graphics.lineTo(x * (this.envs.width / (this.zigZagPeakCount * 2)), currentHeight - ((x % 2 === 0) ? 0 : step) + this.zigZagHeight);
      }

      this.graphics.lineTo(0, currentHeight);

      this.graphics.closePath();

      this.graphics.fillStyle(this.color1, 1);
      this.graphics.fillPath();
    }
  }

  update(time, delta) {
    super.update(time, delta);

    this.draw();
  }
}
