/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class Fireball extends Phaser.Sprite {
   
    constructor(game: Phaser.Game, x: number, direction: number) {
        super(game, x+100, 520, 'fireball');
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        var walk = this.animations.add('fire');
        this.animations.play('fire', 12, true);
        this.body.velocity.x=fireDirection;
    }
}