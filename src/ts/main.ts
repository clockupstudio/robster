/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./player.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var game;
var enemy1;
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
    game.load.image('bat', 'assets/images/bat.png', 80, 80);
}

function create() {
    player = new Player(game);
    game.add.existing(player);
    
    initialEnemy1();
  
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function initialEnemy1() {
    enemy1 = game.add.sprite(1280, 520, 'bat');
    enemy1.width = 80;
    enemy1.height = 80;
    game.physics.enable(enemy1, Phaser.Physics.ARCADE);

    var demoTween = game.add.tween(enemy1)
    .to({x:1120,y:400})
    .to({x:960,y:520})
    .to({x:800,y:400})
    .to({x:640,y:520})
    .to({x:480,y:400})
    .to({x:320,y:520})
    .to({x:160,y:400})
    .to({x:-80,y:520});
    demoTween.start();    
}

function update() {
    game.physics.arcade.overlap(player, enemy1, collisionHandler, null, this);
    
    if (leftKey.isDown) {
        player.moveLeft();
       
    } else if (rightKey.isDown) {
        player.moveRight();
    }
}

function collisionHandler() {
    
    
    game.stage.backgroundColor = '#992d2d';
}
