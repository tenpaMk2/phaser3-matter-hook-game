import { Vector } from "matter";
import * as Phaser from "phaser";
import { Ground } from "../objects/ground";
import { Hook } from "../objects/hook";
import { Platform } from "../objects/platform";
import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene {
  public player: Player;
  public spring: any;
  public platforms: Platform[];
  public platformCategory: number;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("player", "assets/imgs/player.png");
    this.load.image("hook", "assets/imgs/hook.png");
    this.load.image("platform", "assets/imgs/platform.png");
  }

  create() {
    // Objects
    const ground = new Ground(this);

    this.player = new Player(
      this,
      this.scale.width / 2,
      -this.scale.height / 4
    );

    this.platforms = [];
    this.platforms.push(
      new Platform(
        this,
        200,
        -100,
        this.scale.width / 3,
        this.scale.height / 40
      )
    );
    this.platforms.push(
      new Platform(
        this,
        400,
        -600,
        this.scale.width / 3,
        this.scale.height / 40
      )
    );

    let hook = new Hook(this, this.player.x, this.player.y - 100, 300, -900);

    // Colliders
    const category1 = this.matter.world.nextCategory();
    const category2 = this.matter.world.nextCategory();

    this.player.image.setCollisionCategory(category2);
    ground.image.setCollisionCategory(category2);

    this.player.image.setCollidesWith([category2]);

    this.matter.world.on(
      "collisionstart",
      (event: any, bodyA: any, bodyB: any) => {
        event.pairs.forEach((pair: any) => {
          const labels = [pair.bodyA.label, pair.bodyB.label];
          if (labels.includes("platform")) {
            if (labels.includes("hook")) {
              this.spring = this.matter.add.constraint(
                // @ts-ignore
                this.player.image,
                { x: 0, y: 0 },
                0,
                0.0004,
                {
                  label: "spring",
                  pointB: new Phaser.Math.Vector2(hook.image.x, hook.image.y),
                }
              );
              hook.freeze();
            }
          }
        });
      }
    );

    this.input.on("pointerdown", (pointer: any) => {
      if (hook.image.isStatic) {
        hook.die();
        this.matter.world.removeConstraint(this.spring);

        hook = new Hook(
          this,
          this.player.image.x,
          this.player.image.y,
          pointer.worldX,
          pointer.worldY
        );
      }
    });

    // Camera
    const camera = this.cameras.main;
    camera.setBounds(
      0,
      -this.scale.height * 40,
      this.scale.width,
      this.scale.height * 40,
      true
    );
    camera.startFollow(
      this.player.image,
      false,
      1,
      0.1,
      0,
      this.scale.height / 1000
    );
  }

  update(time: number, delta: number) {
    this.player.update();

    this.platforms.forEach((platform) => {
      platform.update();
    });
    this.platforms = this.platforms.filter((platform) => !platform.isDead);

    this.generateNextPlatformIfNeed();
  }

  generateNextPlatformIfNeed() {
    const topPlatform = this.platforms.reduce(
      (previousPlatform, currentPlatform) => {
        return previousPlatform.image.y < currentPlatform.image.y
          ? previousPlatform
          : currentPlatform;
      }
    );

    const camera = this.cameras.main;

    if (topPlatform.image.y < camera.scrollY) {
      return;
    }

    const newPlatform = new Platform(
      this,
      Phaser.Math.RND.between(0, this.scale.width),
      Phaser.Math.RND.between(
        topPlatform.image.y - this.scale.height / 2,
        topPlatform.image.y
      ),
      Phaser.Math.RND.between(0, this.scale.width),
      this.scale.height / 40
    );

    newPlatform.image.setCollisionCategory(2);
    this.platforms.push(newPlatform);
  }
}
