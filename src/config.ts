import * as Phaser from "phaser";
import { GameScene } from "./scenes/game-scene";
import { MainMenuScene } from "./scenes/main-menu-scene";

export const GameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#123333",
  width: 1080 / 2,
  height: 1920 / 2,
  scene: [GameScene],
  input: {
    keyboard: false,
    mouse: true,
    touch: true,
    gamepad: false,
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0.95 },
    },
  },
};
