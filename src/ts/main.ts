/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
var game, enemy1;

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
    initialEnemy1();
}

function initPlayer() {
    player = game.add.sprite(160, 640, 'player');
    player.anchor.x = 0;
    player.anchor.y = 1;
    game.load.image('bat', 'assets/images/bat.png');
}


function initialEnemy1() {
    enemy1 = game.add.sprite(1200, 480, 'bat');
    enemy1.width = 80;
    enemy1.height = 80;
    game.physics.enable(enemy1, Phaser.Physics.ARCADE);
    enemy1.body.acceleration.x = -100;   
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
