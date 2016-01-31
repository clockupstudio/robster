/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class Fireball extends Phaser.Sprite {
    
    direction: number;
    soundAttack;
    
    constructor(game: Phaser.Game, x: number, y:number, direction: number) {
        this.direction = direction;
        
        if (direction == -150) {
            x-=20;
            super(game, x, y, 'fireball');
            this.scale.x = -1;
        }else {
            x+=100;
            super(game, x, y, 'fireball');
            this.scale.x = 1;
        }
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        var walk = this.animations.add('fire');
        this.animations.play('fire', 12, true);
        
        this.body.allowGravity = false;
        
        this.soundAttack = this.game.add.audio('attack');
    }
    
    launch() {
        this.body.velocity.x = this.direction*2;
        this.soundAttack.play();
    }
   
}