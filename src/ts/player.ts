class Player extends Phaser.Sprite {
    
    constructor(game: Phaser.Game) {
        super(game, 160, 640, 'player');
        this.anchor.x = 0;
        this.anchor.y = 1;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        
        var stepMove = 2.5;
    }
    
    moveLeft() {
        this.anchor.x = 1;
        this.scale.x = -1;
        this.x = this.x - stepMove ;
    }
    
    moveRight() {
        this.anchor.x = 0;
        this.scale.x = 1;
        this.x = this.x + stepMove;
    }
}
