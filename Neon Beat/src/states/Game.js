var NeonBeat = NeonBeat || {};
NeonBeat.Game = function(){};

NeonBeat.Game.prototype = {
    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME** state");
		}
    },

    preload: function(){

    },

    create: function(){
        this.state.start('EndGame');
    },
}