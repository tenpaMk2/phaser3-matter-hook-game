import * as Phaser from "phaser";

export class Hook {
  public image: Phaser.Physics.Matter.Image;
  public isDead: boolean = false;

  constructor(
    public scene: Phaser.Scene,
    public x: number,
    public y: number,
    targetX: number,
    targetY: number
  ) {
    this.initPhysics(x, y, targetX, targetY);
  }

  private initPhysics(x: number, y: number, targetX: number, targetY: number) {
    this.image = this.scene.matter.add.image(x, y, "hook");
    this.image.setBody(
      {},
      {
        isSensor: true,
        force: new Phaser.Math.Vector2(
          (targetX - x) / 100000,
          (targetY - y) / 100000
        ),
        label: "hook",
      }
    );
    this.image.setDisplaySize(10, 10);
  }

  public freeze() {
    this.image.setStatic(true);
  }

  public die() {
    this.image.destroy();
    this.isDead = true;
  }
}
