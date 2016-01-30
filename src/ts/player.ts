/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />

class Player extends Phaser.Sprite {
    
    stepMove:number = 2.5;
    isDisable:boolean = false;
    jumpping:boolean = false;
    isFiring:boolean = false;
    fireArray:Array<Phaser.Sprite>;
    
    constructor(game: Phaser.Game) {
        super(game, 160, 640, 'player');
        
        this.animations.add('idle', new SequentialFrameOrderGenerater().generate(0, 0), 1);
        this.animations.add('jumpUp', new SequentialFrameOrderGenerater().generate(0, 4), 5);
        this.animations.add('jumpDown', new SequentialFrameOrderGenerater().generate(5, 3), 3);
        this.animations.add('run', new SequentialFrameOrderGenerater().generate(8, 7), 16);
        this.animations.add('idleAtk', new SequentialFrameOrderGenerater().generate(16, 0), 1);
        this.animations.add('jumpAtk', new SequentialFrameOrderGenerater().generate(17, 7), 8);
        this.animations.add('runAtk', new SequentialFrameOrderGenerater().generate(24, 7), 8);
        this.animations.add('hit', new SequentialFrameOrderGenerater().generate(32, 1), 2);
        this.animations.add('die', new SequentialFrameOrderGenerater().generate(34, 5), 6);
        
        this.anchor.x = 0;
        this.anchor.y = 1;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        this.fireArray = new Array();
    }
    
    idle() {
        if (this.jumpping) {
            return;
        }
        this.animations.play('idle');
    }
    
    moveLeft() {
        if(this.isDisable){
            return;
        }
        
        this.anchor.setTo(0.5,1);
        this.scale.x = -1;
        
        
        this.x = this.x - this.stepMove ;
        this.animations.play('run');
    }
    
    moveRight() {
        if(this.isDisable){
            return;
        }
        
        this.anchor.x = 0;
        this.scale.x = 1;
        this.x = this.x + this.stepMove;
        this.animations.play('run');
    }
    
    jumpUp() {
        if(this.isDisable){
            return;
        }
        
        this.jumpping = true;
        this.body.allowGravity = true;
        this.body.velocity.y = -450;
        this.animations.play('jumpUp');
    }
    
    jumpDown() {
        this.animations.play('jumpDown').onComplete.add(this.onJumpComplete, this);
    }
    
    onJumpComplete() {
        this.jumpping = false;
        this.animations.play('idle');
    }
    
    idleAtk() {
        if(this.isFiring){
            return;
        }
        
        this.isFiring = true;
        
        this.animations.play('idleAtk').onComplete.add(this.idle, this);
        
        fireBall = new Fireball(game, player.x, (player.y - 130), fireDirection);
        
        this.fireArray.push(fireBall);
        this.game.add.existing(fireBall);
        
        this.game.time.events.add(300, () => {
            this.isFiring = false;
        }, this);
        
        fireBall.launch();
    }
    
    disable() {
        this.isDisable = true;
    }

    enable() {
        this.isDisable = false;
    }

    gotHit() {
        if(this.isDisable){
            return;
        }
       
        this.animations.play('hit');
        this.disable();
        
        this.game.time.events.add(500, () => {
            this.animations.play('die').onComplete.add(this.disable, this);
        }, this);
        
        var striking:Phaser.Tween = this.game.add.tween(this);
        striking.to({x:(this.x-50)}, 100);
        striking.start();
    }
    
    dead() {
        this.animations.play('die').onComplete.add(this.disable, this);
    }
}
