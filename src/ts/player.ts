/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class Player extends Phaser.Sprite {
    
    stepMove:number = 2.5;
    isDisable:boolean = false;
    
    constructor(game: Phaser.Game) {
        super(game, 160, 640, 'player');
        
        this.animations.add('idle', new SequentialFrameOrderGenerater().generate(0, 0), 1);
        this.animations.add('run', new SequentialFrameOrderGenerater().generate(8, 7), 16);
        
        this.anchor.x = 0;
        this.anchor.y = 1;
        game.physics.enable(this, Phaser.Physics.ARCADE);
    }
    
    idle() {
        this.animations.play('idle');
    }
    
    moveLeft() {
        this.anchor.x = 1;
        this.scale.x = -1;
        this.x = this.x - this.stepMove ;
        this.animations.play('run');
    }
    
    moveRight() {
        this.anchor.x = 0;
        this.scale.x = 1;
        this.x = this.x + this.stepMove;
        this.animations.play('run');
    }
    
    disable() {
        this.isDisable = true;
    }
    
}
