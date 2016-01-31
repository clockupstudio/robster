/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />
/// <reference path="./fireball.ts" />

class Player extends Phaser.Sprite {

    stepMove: number = 2.5;
    isDisable: boolean = false;
    jumpping: boolean = false;
    isFiring: boolean = false;
    isDead: boolean = false;
    isIdling: boolean = false;
    fireArray: Phaser.Group;
    onDead: Phaser.Signal;
    soundMove;
    soundDie;
    fireDirection:number = 150;

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

        this.fireArray = this.game.add.group();

        this.onDead = new Phaser.Signal();
        
        this.soundMove = this.game.add.audio('move');
        this.soundDie = this.game.add.audio('die');
    }

    idle() {
        if (this.jumpping) {
            return;
        }
        if (this.isDead) {
            return;
        }
        if (this.isFiring) {
            return;
        }
        this.isIdling = true;
        this.animations.play('idle');
    }

    moveLeft() {
        if (this.isDisable) {
            return;
        }

        this.anchor.setTo(0.5, 1);
        this.scale.x = -1;


        this.x = this.x - this.stepMove;

        if (this.jumpping) {
            return;
        }
        this.animations.play('run').onComplete.add(()=>{
            this.idle();
        }, this);
    }

    moveRight() {
        if (this.isDisable) {
            return;
        }

        this.anchor.x = 0;
        this.scale.x = 1;
        this.x = this.x + this.stepMove;

        if (this.jumpping) {
            return;
        }
        this.animations.play('run').onComplete.add(()=>{
            this.idle();
        }, this);
    }


    jumpUp() {
        if (this.isDisable) {
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
    
    attack(){
        if (this.isFiring) {
            return;
        }

        this.isFiring = true;
        
        this.idleAtk();
        this.jumpAttack();
        
        var fireBall:Fireball = new Fireball(this.game, this.x, (this.y - 130), this.fireDirection);
        this.fireArray.add(fireBall);
        
        var timer:Phaser.Timer = this.game.time.create(true);
        timer.add(300, () => {
            this.isFiring = false;
        }, this);
        timer.start();

        fireBall.launch();
    }

    idleAtk() {
        if( this.isFiring && this.jumpping){
            return;
        }
        this.animations.play('idleAtk').onComplete.add(this.idle, this);
    }
    
    jumpAttack() {
        if( !this.jumpping ){
            return;
        }
        this.animations.play('jumpAtk').onComplete.add(this.idle, this);
    }

    disable() {
        this.isDisable = true;
    }

    enable() {
        this.isDisable = false;
    }

    gotHit() {
        if (this.isDisable) {
            return;
        }

        this.animations.play('hit');
        this.disable();

        this.game.time.events.add(500, this.dead, this);

        var striking: Phaser.Tween = this.game.add.tween(this);
        striking.to({ x: (this.x - 50) }, 100);
        striking.start();

        var graphics: Phaser.Graphics = this.game.add.graphics(0, 0);
        graphics.beginFill(0xFF0000, 1);
        graphics.drawRect(0, 0, 1280, 720);
        graphics.endFill();
        graphics.fixedToCamera = true;

        var damaged: Phaser.Tween = this.game.add.tween(graphics);
        damaged.to({ alpha: 0 }, 300, null);
        damaged.start();
    }

    dead() {
        this.soundDie.play();
        this.isDead = true;
        this.animations.play('die').onComplete.add(this.disable, this);
        this.onDead.dispatch();
    }
}
