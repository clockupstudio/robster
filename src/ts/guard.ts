/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />

class Guard extends Phaser.Sprite {
    
    constructor(game:Phaser.Game, x:number, y:number){
        super(game, x, y, 'guard');
        
        this.anchor.x = 0;
        this.anchor.y = 1;
        
        this.animations.add('idle', new SequentialFrameOrderGenerater().generate(1, 1), 60);
        //this.animations.add('stunned', new SequentialFrameOrderGenerater().generate(0, 1), 60);
        //this.animations.add('shoot', new SequentialFrameOrderGenerater().generate(2, 3), 60);
        this.animations.play('idle');
    }
}