/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />
/// <reference path="./sequential_frame_order_generater.ts" />
/// <reference path="./player.ts" />
/// <reference path="./bat.ts" />
/// <reference path="./fireball.ts" />
/// <reference path="./guard.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var groundLayer;
var game: Phaser.Game;
// var enemy;
var bats: Array<Bat>;
var fireBall;
var player: Player;
var leftKey;
var rightKey;
var spaceBarKey;
var hitKey: Phaser.Key;
var died;
var overlay_text: Phaser.Text;

var enemyGroup: Phaser.Group;
var guard: Guard;

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
    game.load.spritesheet('ground', 'assets/images/ground_sprite.png', 80, 80, 1);
    game.load.spritesheet('guard', 'assets/images/guard_sprite.png', 160, 160, 5);
    game.load.spritesheet('riflebullet', 'assets/images/rifle_bullet_sprite.png', 8, 8, 1);

    game.load.image("background", "assets/images/background.gif");
    game.load.tilemap('levelMap', "assets/level.json", null, Phaser.Tilemap.TILED_JSON);

    game.load.audio('attack', 'assets/audios/player_attack.wav');
    game.load.audio('die', 'assets/audios/player_die.wav');
    game.load.audio('enemyHit', 'assets/audios/enemy_hit.wav');
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 600;
    game.world.setBounds(0, 0, 5120, 0);


    var background = game.add.sprite(0, 0, 'background');
    background.fixedToCamera = true;
    background.scale.x = 0.65;
    background.scale.y = 0.65;

    this.map = game.add.tilemap('levelMap');
    this.map.addTilesetImage('ground_sprite', 'ground');
    groundLayer = this.map.createLayer('Ground');
    groundLayer.resizeWorld();
    this.map.createLayer('Background');
    this.map.setCollisionBetween(1, 100, true, 'Ground');

    player = new Player(game);
    player.onDead.add(onPlayerDead);
    game.add.existing(player);
    game.camera.follow(player);

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    spaceBarKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceBarKey.onUp.add(player.jumpUp, player);
    hitKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    hitKey.onUp.add(player.attack, player);

    died = false;

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
    overlay_text = this.game.add.text(0, 0, 'press [jump] to restart', style);
    overlay_text.setTextBounds(0, 100, 1280, 720);
    overlay_text.visible = died;
    overlay_text.fixedToCamera = true;

    enemyGroup = game.add.group();

    // enemy = new Bat(game, 1280, 520);
    // enemyGroup.add(enemy);
    batsBorn();
    bats.forEach(function(bat) {
        enemyGroup.add(bat);
    });

    guard = new Guard(game, 2000, 640);
    enemyGroup.add(guard);
}

function update() {
    if (leftKey.isDown) {
        player.fireDirection = -150;
        player.moveLeft();
    } else if (rightKey.isDown) {
        player.fireDirection = 150;
        player.moveRight();
    }
    else {
        player.idle();
    }

    game.physics.arcade.collide(player, groundLayer);
    game.physics.arcade.collide(enemyGroup, groundLayer);
    game.physics.arcade.overlap(player, guard.firedBullets, collisionHandler, null, this);

    if (guard.state !== 'stunned') {
        player.fireArray.children.forEach((fireBall) => {
            game.physics.arcade.overlap(fireBall, guard, fireBallHitGuard, null, this);
        });
    }

    if (player.body.velocity.y == 10) {
        player.jumpDown();
    }

    if (spaceBarKey.isDown && player.isDead) {
        game.state.restart();
    }
    
    bats.forEach(function(bat) {
        if (!bat.isDisable) {
            if (bat.x -player.x <= 600 ) {
                bat.fly();
            }
            game.physics.arcade.overlap(player, bat, collisionHandler, null, this);
            player.fireArray.forEach(function(fireball) {
                game.physics.arcade.overlap(fireball, bat, collisionEnemy, null, this);
            });
        }
        if (bat.isDisable) {
            game.physics.arcade.overlap(player, bat, collisionEat, null, this);
        }
    });
    
}

function jumpDownComplete() {
    player.body.allowGravity = false;
    player.idle();
}


function collisionEnemy(fireBall:Fireball, bat:Bat) {
    fireBall.kill();
    
    bat.disable();
    bat.idle();
    bat.fall();
}

function collisionHandler() {
    player.gotHit();
}

function collisionEat(man,bat) {
    bat.destroy();
}

function fireBallHitGuard(fireBall) {
    fireBall.kill();
    guard.gotHit();
}


function render() {
    game.debug.body(player);
    // if (enemy != null) {
    //     game.debug.body(enemy);
    // }
    game.debug.body(groundLayer);
}

function onPlayerDead() {
    overlay_text.visible = true;
}

function batsBorn() {
    var saveZone = 450;
    var range = (80*64) / 6;
    bats = new Array();
    
    for (var n=1; n<=6; n++) {
        bats.push(new Bat(game, saveZone+ (range*n), 520));
    }
}