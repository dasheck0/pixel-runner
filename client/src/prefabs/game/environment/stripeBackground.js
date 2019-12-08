import Background from "./background";

export default class StripeBackground extends Background {
  constructor(name, scene, options, envs) {
    super(name, scene, options, envs);

    this.stripeCount = 20;
    this.stripeShearing = 1;
    this.offset = 0;

    this.tween = this.scene.tweens.add({
      targets: this,
      props: {
        offset: { from: 0, to: 2 * this.envs.height },
      },
      ease: 'Linear',
      duration: this.animationDuration * 2,
      repeat: -1,
    });
  }

  draw() {
    this.graphics.clear();

    for (let i = 0; i < this.stripeCount + 4 * this.stripeShearing; i += 1) {
      this.graphics.beginPath();

      this.graphics.moveTo(i * this.envs.width / this.stripeCount, 0 - this.offset);
      this.graphics.lineTo((i - 4 * this.stripeShearing) * this.envs.width / this.stripeCount, 4 * this.envs.height - this.offset);
      this.graphics.lineTo((i - 3 * this.stripeShearing) * this.envs.width / this.stripeCount, 4 * this.envs.height - this.offset);
      this.graphics.lineTo((i + this.stripeShearing) * this.envs.width / this.stripeCount, 0 - this.offset);

      this.graphics.closePath();

      this.graphics.fillStyle(i % 2 === 0 ? this.color0 : this.color1, 1);
      this.graphics.fillPath();
    }
  }

  update(time, delta) {
    super.update(time, delta);

    this.draw();
  }
}
