/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class RifleBullet extends Phaser.Sprite {
    constructor(game: Phaser.Game, x:number, y:number){
        super(game, x, (y-90), 'riflebullet');
        this.scale.setTo(2, 2);
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = false;
        this.gotFired();
    }
    
    gotFired(){
        this.body.velocity.x = -150;
    }
}