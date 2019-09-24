var NeonBeat = NeonBeat || {};
NeonBeat.MainMenu = function(){};

NeonBeat.MainMenu.prototype = {
    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **MAIN MENU** state");
		}
    },

    preload: function(){

    },

    create: function(){
        this.state.start('GameState');
    },
}