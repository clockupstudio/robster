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
var player: Player;
var leftKey;
var rightKey;
var spaceBarKey;
var hitKey
var died;
var overlay_text;

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
    game.load.spritesheet('ground', 'assets/images/Tile_2.png', 256, 256, 1);
}

function create() {
    
    ground = game.add.tileSprite(0, 540, 2560, 540, 'ground');
    game.world.setBounds(0, 0, 2560, 0);
    
    game.stage.backgroundColor = '#000000';
    player = new Player(game);
    game.add.existing(player);
    
    game.camera.follow(player);
    
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
    if (player.x === 450) {
        enemy.fly();
    }
    
    if (!enemy.isDisable) {
        game.physics.arcade.overlap(player, enemy, collisionHandler, null, this);
    }
    
    if (enemy.isDisable) {
        game.physics.arcade.overlap(player, enemy, collisionEat, null, this);
    }

    if (leftKey.isDown) {
        player.moveLeft();
    } else if (rightKey.isDown) {
        player.moveRight();
    } else {
        player.idle();
    }
    
    if (!enemy.isDisable) {
        game.physics.arcade.overlap(fireBall, enemy, collisionEnemy, null, this);
    }

    if (spaceBarKey.isDown) {
        game.state.restart();
    }

    if (hitKey.isDown) {
        fireBall = new Fireball(game, player.x);
        game.add.existing(fireBall);
    }
}

function collisionEnemy() {
    enemy.disable();
    enemy.idle();
    enemy.fall();
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

}