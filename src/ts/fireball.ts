/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class Fireball extends Phaser.Sprite {
   
    constructor(game: Phaser.Game, x: number, direction: number) {
        if (direction == -150) {
            x-=20;
            super(game, x, 520, 'fireball');
            this.scale.x = -1;
        }else {
            x+=100;
            super(game, x, 520, 'fireball');
            this.scale.x = 1;
        }
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        var walk = this.animations.add('fire');
        this.animations.play('fire', 12, true);
        this.body.velocity.x=direction;
        this.body.allowGravity = false;
    }
}