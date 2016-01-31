/// <reference path="./guard.ts" />
/// <reference path="./guard_memory.ts" />

class SpecialGuard extends Guard {
    
    gotEaten(){
        var guardMemory: GuardMemory = new GuardMemory(this.game);
        this.game.add.existing(guardMemory);
        this.game.time.events.add(300, () => {
            guardMemory.kill();
        }, this);
        super.gotEaten();
    }
}