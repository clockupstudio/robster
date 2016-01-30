/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />
/// <reference path="./player.ts" />
/// <reference path="./bat.ts" />
/// <reference path="./fireball.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var ground;
var game;
var enemy;
var fireBall;
var fireArray:Array<Phaser.Sprite>;
var player: Player;
var leftKey;
var rightKey;
var spaceBarKey;
var hitKey
var died;
var overlay_text;
var fireDirection = 150;

function display() {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'robster', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });
}

function preload() {
    game.load.spritesheet('player', 'assets/images/player.png', 160, 160, 16);
    game.load.spritesheet('bat', 'assets/images/bat-sprite.png', 80, 80, 3);
    game.load.spritesheet('fireball', 'assets/images/fireball_sprite.png', 64, 64, 6);
    game.load.spritesheet('ground', 'assets/images/wasteland-tile.png', 135, 135, 1);
    game.load.image("background", "assets/images/vlAAe.gif");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 600;
    game.world.setBounds(0, 0, 2560, 0);
 
    fireArray = new Array();
    
    var background = game.add.sprite(0, 0, 'background');
    background.fixedToCamera = true;
    background.scale.x = 0.65;
    background.scale.y = 0.65;
    
    ground = game.add.tileSprite(0, 640, 2560, 640, 'ground');
    game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.setSize(2560, 80, 0, 0);
    ground.body.immovable = true;
    ground.body.allowGravity = false;
    
    game.stage.backgroundColor = '#000000';
    
    player = new Player(game);
    game.add.existing(player);
    game.camera.follow(player);

    enemy = new Bat(game);
    game.add.existing(enemy);
    
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    hitKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    died = false;

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    overlay_text = this.game.add.text(0, 0, 'press [space] to restart', style);
    overlay_text.setTextBounds(0, 100, 1280, 720);
    overlay_text.visible = died;
}

function update() {
    if (player.x == 450) {
        enemy.fly(1280);
    }
    
    if (!enemy.isDisable) {
        game.physics.arcade.overlap(player, enemy, collisionHandler, null, this);
    }
    
    if (enemy.isDisable) {
        game.physics.arcade.overlap(player, enemy, collisionEat, null, this);
    }
    
    game.physics.arcade.collide(player, ground, jumpDownComplete, null, this);

    if (leftKey.isDown) {
        fireDirection = -150;
        player.moveLeft();
    } else if (rightKey.isDown) {
        fireDirection = 150;
        player.moveRight();
    } else if (spaceBarKey.isDown) {
         player.jumpUp();
    } else {
         player.idle();
    }
    
    if (player.body.velocity.y == 10) {
            player.jumpDown();
        }

    if (!enemy.isDisable) {
        fireArray.forEach(function(fireball) {
            game.physics.arcade.overlap(fireball, enemy, collisionEnemy, null, this);
        });
    }

    if (spaceBarKey.isDown && died) {
        game.state.restart();
    }

    if (hitKey.isDown) {
        fireBall = new Fireball(game, player.x, fireDirection);
        fireArray.push(fireBall);
        game.add.existing(fireBall);
        
        if (fireArray.length > 10) {
            fireArray.shift();
        }
    }
}

function jumpDownComplete() {
    player.body.allowGravity = false;
    player.idle();
}

function collisionEnemy(fireball) {
    enemy.disable();
    enemy.idle();
    enemy.fall();
    fireball.visible = false;
}

function collisionHandler() {
    game.stage.backgroundColor = '#992d2d';
    
    player.gotHit();
    
    game.time.events.add(500, ()=> {
        died = true;
        overlay_text.visible = true;
    });
}

function collisionEat() {
    enemy.visible = false;
}

function render() {
    // game.debug.body(player);
    // game.debug.body(ground);
}