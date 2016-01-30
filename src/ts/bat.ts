/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class Bat extends Phaser.Sprite {
   
    constructor(game: Phaser.Game) {
        super(game, 1280, 520, 'bat');
        this.width = 80;
        this.height = 80;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        var walk = this.animations.add('fly');
        this.animations.play('fly', 3, true);
    }
    
    fly() {
        var demoTween = game.add.tween(this)
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
}
