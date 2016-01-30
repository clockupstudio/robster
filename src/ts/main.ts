/// <reference path="../../bower_components/phaser/typescript/phaser.d.ts" />

document.addEventListener('DOMContentLoaded', () => display());

var game;

function display() {
    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'robster', {
    preload: preload,
    create: create,
    });
}

function preload() {
    game.load.spritesheet('player', 'assets/images/player.png', 80, 160);
}

function create() {
    var player = game.add.sprite(160, 640, 'player');
    player.anchor.x = 0;
    player.anchor.y = 1;
}