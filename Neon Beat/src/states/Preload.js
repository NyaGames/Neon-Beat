var NeonBeat = NeonBeat || {};
NeonBeat.Preload = function(){};

NeonBeat.Preload.prototype = {
    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **PRELOAD** state");
		}
    },

    preload: function(){
        this.load.image('furro', 'assets/furro.jpg');
        this.load.image('pelota', 'assets/pelota.png');
        this.load.image('neonLine', 'assets/pixel_linea.png');
    },

    create: function(){
        this.state.start('MainMenu');
    },
}