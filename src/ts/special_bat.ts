/// <reference path="./bat.ts" />
/// <reference path="./bat_memory.ts" />

class SpecialBat extends Bat {
    
    constructor(game:Phaser.Game, x:number, y:number){
        super(game, x, y);
        
    }
    
    gotEaten(){
        var batMemory: BatMemory = new BatMemory(this.game);
        this.game.add.existing(batMemory);
        var timer:Phaser.Timer = this.game.time.create(true);
        timer.add(300, () => {
            batMemory.kill();
        }, this);
        timer.start();
        super.gotEaten();
    }
}