var NeonBeat = NeonBeat || {};
NeonBeat.game = new Phaser.Game(600, 600, Phaser.AUTO, ' ');

NeonBeat.global = {
    DEBUG_MODE: true
}

NeonBeat.game.state.add('Boot', NeonBeat.Boot);
NeonBeat.game.state.add('Preload', NeonBeat.Preload);
NeonBeat.game.state.add('MainMenu', NeonBeat.MainMenu);
NeonBeat.game.state.add('Game', NeonBeat.Game);
NeonBeat.game.state.add('EndGame', NeonBeat.EndGame);

NeonBeat.game.state.start('Boot');