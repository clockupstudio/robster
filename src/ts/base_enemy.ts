/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class BaseEnemy extends Phaser.Sprite {
    
    gotEaten(){
        this.kill();
    }
}