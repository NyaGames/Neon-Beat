var NeonBeat = NeonBeat || {};
NeonBeat.Boot = function(){};

NeonBeat.Boot.prototype = {
    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **BOOT** state");
		}
    },

    preload: function(){

    },

    create: function(){
        this.state.start('Preload');
    },
}