/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

class GuardMemory extends Phaser.Sprite {
    
    constructor(game:Phaser.Game){
        super(game, 0, 0, 'guardmemory');
        this.fixedToCamera = true;
    }
}