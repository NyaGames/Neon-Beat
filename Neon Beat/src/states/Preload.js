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
    },

    create: function(){
        this.state.start('MainMenu');
    },
}