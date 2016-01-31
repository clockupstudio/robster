/// <reference path="./bat.ts" />
/// <reference path="./bat_memory.ts" />

class SpecialBat extends Bat {
    
    constructor(game:Phaser.Game, x:number, y:number){
        super(game, x, y);
        
    }
    
    gotEaten(){
        var batMemory: BatMemory = new BatMemory(this.game);
        this.game.add.existing(batMemory);
        this.game.time.events.add(300, () => {
            batMemory.kill();
        }, this);
        super.gotEaten();
    }
}