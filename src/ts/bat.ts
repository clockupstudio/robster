/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />

class Bat extends Phaser.Sprite {
    flyingTween:Phaser.Tween;
    fallTween:Phaser.Tween;
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
        this.flyingTween.pause();
    }
    
    fall() {
        this.fallTween = this.game.add.tween(this)
        .to({x:this.x-120, y:575});
        this.fallTween.start();
    }
    
    fly() {
        var x = 1120;
        var y = 400;
        this.flyingTween = this.game.add.tween(this)
        .to({x:x, y:y})
        .to({x:x-160, y:y+120})
        .to({x:x-320, y:y})
        .to({x:x-480, y:y+120})
        .to({x:x-640, y:y})
        .to({x:x-800, y:y+120})
        .to({x:x-960, y:y})
        .to({x:x-1120, y:y+120});
        this.flyingTween.start();    
    }
    
    disable() {
        this.isDisable = true;
    }
}
