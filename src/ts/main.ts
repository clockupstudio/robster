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
var hitKey: Phaser.Key;
var died;
var overlay_text: Phaser.Text;
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
    game.load.spritesheet('player', 'assets/images/player_sprite.png', 160, 160, 40);
    game.load.spritesheet('bat', 'assets/images/bat_sprite.png', 80, 80, 3);
    game.load.spritesheet('fireball', 'assets/images/fireball_sprite.png', 64, 64, 6);
    game.load.spritesheet('ground', 'assets/images/ground_sprite.png', 135, 135, 1);
    game.load.image("background", "assets/images/background.gif");
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 600;
    game.world.setBounds(0, 0, 2560, 0);


    var background = game.add.sprite(0, 0, 'background');
    background.fixedToCamera = true;
    background.scale.x = 0.65;
    background.scale.y = 0.65;

    ground = game.add.tileSprite(0, 640, 2560, 640, 'ground');
    game.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.setSize(2560, 80, 0, 0);
    ground.body.immovable = true;
    ground.body.allowGravity = false;

    player = new Player(game);
    player.onDead.add(onPlayerDead);
    game.add.existing(player);
    game.camera.follow(player);

    enemy = new Bat(game);
    game.add.existing(enemy);

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBarKey.onUp.add(player.jumpUp, player);
    hitKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    hitKey.onUp.add(player.idleAtk, player);

    died = false;

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    overlay_text = this.game.add.text(0, 0, 'press [jump] to restart', style);
    overlay_text.setTextBounds(0, 100, 1280, 720);
    overlay_text.visible = died;
    overlay_text.fixedToCamera = true;
}

function update() {
    if (leftKey.isDown) {
        fireDirection = -150;
        player.moveLeft();
    } else if (rightKey.isDown) {
        fireDirection = 150;
        player.moveRight();
    }
    else {
        player.idle();
    }

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

    if (player.body.velocity.y == 10) {
        player.jumpDown();
    }

    if (!enemy.isDisable) {
        player.fireArray.forEach(function(fireball) {
            game.physics.arcade.overlap(fireball, enemy, collisionEnemy, null, this);
        });
    }

    if (spaceBarKey.isDown && player.isDead) {
        game.state.restart();
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
    player.gotHit();
}

function collisionEat() {
    enemy.visible = false;
}

function render() {
    // game.debug.body(player);
    // if (enemy != null) {
    //     game.debug.body(enemy);
    // }
    // game.debug.body(ground);
}

function onPlayerDead() {
    overlay_text.visible = true;
}