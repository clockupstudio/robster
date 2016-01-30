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
    game.load.image('bat', 'assets/images/bat.png', 80, 80);
}

function create() {
    initPlayer();
    initialEnemy1();
  
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

function initPlayer() {
    player = game.add.sprite(160, 640, 'player');
    player.anchor.x = 0;
    player.anchor.y = 1;
    game.physics.enable(player, Phaser.Physics.ARCADE);
}


function initialEnemy1() {
    enemy1 = game.add.sprite(1200, 480, 'bat');
    enemy1.width = 80;
    enemy1.height = 80;
    game.physics.enable(enemy1, Phaser.Physics.ARCADE);
    // enemy1.body.acceleration.x = -100;
    
    var demoTween = game.add.tween(enemy1).to({x:1120,y:400},1000)
    .to({x:1040,y:480})
    .to({x:960,y:400})
    .to({x:880,y:480})
    .to({x:800,y:400})
    .to({x:720,y:480})
    .to({x:640,y:400})
    .to({x:560,y:480})
    .to({x:480,y:400})
    .to({x:400,y:480})
    .to({x:320,y:400})
    .to({x:240,y:480})
    .to({x:160,y:400})
    .to({x:80,y:480})
    .to({x:0,y:400});
    // demoTween.onComplete.add(function(){
    //     enemy1.x = 100;
    //     enemy1.y = 100;
    //     demoTween.start();
    // });
    demoTween.start();    
}

function update() {
    game.physics.arcade.overlap(player, enemy1, collisionHandler, null, this);
    
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

function collisionHandler() {
    game.stage.backgroundColor = '#992d2d';
}
