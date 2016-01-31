/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />

class Bat extends Phaser.Sprite {
    
    flyingTween:Phaser.Tween;
    fallTween:Phaser.Tween;
    isDisable:boolean = false;
    flying:boolean = false;
    soundHit;
   
    constructor(game: Phaser.Game) {
        super(game, 1280, 520, 'bat');
        this.width = 80;
        this.height = 80;
        
        this.animations.add('fly', new SequentialFrameOrderGenerater().generate(0, 1), 8, true);
        this.animations.add('idle', new SequentialFrameOrderGenerater().generate(2, 0), 1);
        
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.animations.play('fly');
        
        this.soundHit = this.game.add.audio('enemyHit');
    }
    
    idle() {
        this.animations.play('idle');
        if (this.flyingTween != null) {
            this.flyingTween.pause();
        }
    }
    
    fall() {
        this.fallTween = this.game.add.tween(this)
        .to({x:this.x, y:575}, 400);
        this.fallTween.start();
        this.soundHit.play();
    }
    
    fly(x:number) {
        if (!this.flying) {
            var y = 300;
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
            this.flying = true;    
        }
    }
    
    disable() {
        this.isDisable = true;
    }
}
