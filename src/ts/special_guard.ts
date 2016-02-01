/// <reference path="./guard.ts" />
/// <reference path="./guard_memory.ts" />

class SpecialGuard extends Guard {
    
    gotEaten(){
        var guardMemory: GuardMemory = new GuardMemory(this.game);
        this.game.add.existing(guardMemory);
        var timer:Phaser.Timer = this.game.time.create(true);
        timer.add(300, () => {
            guardMemory.kill();
        }, this);
        timer.start();
        super.gotEaten();
    }
}