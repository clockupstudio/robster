/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var game;
var player;
var leftKey;
var rightKey;
var stepMove = 2.5;

function display() {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'robster', {
    preload: preload,
    create: create,
    update: update,
    });
}

function preload() {
    game.load.spritesheet('player', 'assets/images/player.png', 80, 160);
}

function create() {
    initPlayer();
  
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function initPlayer() {
    player = game.add.sprite(160, 640, 'player');
    player.anchor.x = 0;
    player.anchor.y = 1;
}

function update() {
    if (leftKey.isDown)
    {
        player.anchor.x = 1;
        player.scale.x = -1;
        player.x = player.x - stepMove ;
        
    }
    else if (rightKey.isDown)
    {
        player.anchor.x = 0;
        player.scale.x = 1;
        player.x = player.x + stepMove;
    }
}