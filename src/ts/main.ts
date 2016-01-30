/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./player.ts" />
/// <reference path="./bat.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var game;
var enemy;
var player: Player;
var leftKey;
var rightKey;
var spaceBarKey;
var died;
var overlay_text;

function display() {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'robster', {
        preload: preload,
        create: create,
        update: update,
    });
}

function preload() {
    game.load.spritesheet('player', 'assets/images/player.png', 80, 160);
    game.load.spritesheet('bat', 'assets/images/bat-sprite.png', 80, 80, 2);
}

function create() {
    game.stage.backgroundColor = '#000000';
    player = new Player(game);
    game.add.existing(player);

    enemy = new Bat(game);
    game.add.existing(enemy);
    enemy.fly();

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    died = false;
    
    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    overlay_text = this.game.add.text( 0, 0, 'press [space] to restart',style);
    overlay_text.setTextBounds(0, 100, 1280, 720);
    overlay_text.visible = died;
}

function update() {
    if (!player.isDisable) {
        console.log('in')
        game.physics.arcade.overlap(player, enemy, collisionHandler, null, this);

        if (leftKey.isDown) {
            player.moveLeft();

        } else if (rightKey.isDown) {
            player.moveRight();
        }
    }

    if (spaceBarKey.isDown) {
        game.state.restart();
    }
}

function collisionHandler() {
    game.stage.backgroundColor = '#992d2d';
    player.disable();
    died = true;
    overlay_text.visible = true;
}
