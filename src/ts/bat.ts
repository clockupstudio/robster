/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />

class Bat extends Phaser.Sprite {
    
    isDisable:boolean = false;
   
    constructor(game: Phaser.Game) {
        super(game, 1280, 520, 'bat');
        this.width = 80;
        this.height = 80;
        
        this.animations.add('fly', new SequentialFrameOrderGenerater().generate(0, 1), 8, true);
        this.animations.add('idle', new SequentialFrameOrderGenerater().generate(2, 0), 1);
        
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.animations.play('fly');
    }
    
    idle() {
        this.animations.play('idle');
    }
    
    fly() {
        var demoTween = this.game.add.tween(this)
        .to({x:1120, y:400})
        .to({x:960, y:520})
        .to({x:800, y:400})
        .to({x:640, y:520})
        .to({x:480, y:400})
        .to({x:320, y:520})
        .to({x:160, y:400})
        .to({x:-80, y:520});
        demoTween.start();    
    }
    
    disable() {
        this.isDisable = true;
        console.log('enemy has attacked')
    }
}
