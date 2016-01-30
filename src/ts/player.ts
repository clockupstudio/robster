/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class Player extends Phaser.Sprite {
    
    stepMove:number = 2.5;
    isDisable:boolean = false;
    
    constructor(game: Phaser.Game) {
        super(game, 160, 640, 'player');
        this.anchor.x = 0;
        this.anchor.y = 1;
        game.physics.enable(this, Phaser.Physics.ARCADE);   
    }
    
    moveLeft() {
        this.anchor.x = 1;
        this.scale.x = -1;
        this.x = this.x - this.stepMove ;
    }
    
    moveRight() {
        this.anchor.x = 0;
        this.scale.x = 1;
        this.x = this.x + this.stepMove;
    }
    
    disable() {
        this.isDisable = true;
    }
    
}
