/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./player.ts" />
/// <reference path="./bat.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var game;
var enemy;
var player;
var leftKey;
var rightKey;
var spaceBarKey;

function display() {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'robster', {
    preload: preload,
    create: create,
    update: update,
    });
}

function preload() {
    game.load.spritesheet('player', 'assets/images/player.png', 80, 160);
    game.load.spritesheet('bat', 'assets/images/bat-sprite.png', 80, 80,2);
}

function create() {
    player = new Player(game);
    game.add.existing(player);
    
    enemy = new Bat(game);
    game.add.existing(enemy);
    enemy.fly();

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    game.physics.arcade.overlap(player, enemy, collisionHandler, null, this);
    
    if (leftKey.isDown) {
        player.moveLeft();
       
    } else if (rightKey.isDown) {
        player.moveRight();
    }
    else if (spaceBarKey.isDown) {
        game.state.restart();
        game.stage.backgroundColor = '#000000';
    }
}

function collisionHandler() {
    game.stage.backgroundColor = '#992d2d';
}
