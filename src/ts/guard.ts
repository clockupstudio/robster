/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./rifle_bullet.ts" />
/// <reference path="./base_enemy.ts" />

class Guard extends BaseEnemy {
    
    firedBullets:Phaser.Group;
    shootTimer:Phaser.TimerEvent;
    state:string = 'idle';
    
    constructor(game:Phaser.Game, x:number, y:number){
        super(game, x, y, 'guard');
        
        this.anchor.x = 0;
        this.anchor.y = 1;
        
        this.animations.add('idle', new SequentialFrameOrderGenerater().generate(1, 0), 1, true);
        this.animations.add('stunned', new SequentialFrameOrderGenerater().generate(0, 0), 1, true);
        this.animations.add('shoot', [2, 3, 4], 8, false);
        this.animations.play('idle');
        
        this.shootTimer = this.game.time.events.loop(3000, () => {
            this.state = 'shooting';
            this.animations.play('shoot').onComplete.add(this.onShootCompleted, this);
            this.firedBullets.add(new RifleBullet(this.game, this.x, this.y));
        }, this);
        
        this.firedBullets = this.game.add.group();
        
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.allowGravity = false;
    }
    
    onShootCompleted(){
        this.state = 'idle';
        this.animations.play('idle');
    }
    
    gotHit(){
        this.state = 'stunned';
        this.animations.play('stunned');
        this.shootTimer.timer.destroy();
    }
}