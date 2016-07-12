var game = new Phaser.Game(800, 350, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.video('octopus', 'assets/octonaut.mp4', 'canplaythrough', true);
    game.load.image('submarine', 'assets/submarine.png');
    game.load.bitmapFont('digital_font','assets/fonts/font.png', 'assets/fonts/font.fnt');
}

var video;
var cursors;
var sprite;
var yMaxTravel = 100;

function create() {

    game.stage.backgroundColor = '#000';

    video = game.add.video('octopus');

    sprite = video.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 0.76, 0.76);
    sprite.anchor.set(0.5);

    video.play(true);

	var subOverlay = game.add.sprite(0, -50, 'submarine');

	cursors = game.input.keyboard.createCursorKeys();

    var typewriter = new Typewriter();
    typewriter.init(game, {
        x: 0,
        y: 40,
        fontFamily: "digital_font",
        fontSize: 25,
        maxWidth: 600,
        text: "Depth: 125m, Location: -33.1806, 151.70328"
    });
    typewriter.start();
}

function update() {
	if (cursors.left.isDown)
    {
        sprite.angle -= 1;
    }

	if (cursors.right.isDown)
    {
        sprite.angle += 1;      
    }   

    if (cursors.up.isDown)
    {
        if (sprite.scale.x < 1.5) {
            sprite.scale.setTo(sprite.scale.x+0.005, sprite.scale.y+0.005);           
        }
    }

    // Limiting to a scale of 0.76 to limit letterboxing of the video on twirl
    if (cursors.down.isDown)
    {
        if (sprite.scale.x > 0.76) {
            sprite.scale.setTo(sprite.scale.x-0.005, sprite.scale.y-0.005);           
        }        
    }       
}

function render() {
	game.debug.text(game.time.fps, 2, 14, "#00ff00");
}