var NeonBeat = NeonBeat || {};
NeonBeat.Game = function(){};

NeonBeat.Game.prototype = {
    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME** state");
        }
        
        this.fftHistory;
    },

    preload: function(){
       
    },

    create: function(){
        //this.state.start('EndGame');        
    },

    songAdded(file){
        let graphGenerator = new GraphGenerator(1024, 48000, NeonBeat.Game.prototype.songLoaded);
        graphGenerator.decodeAudio(file);
    },

    songLoaded(fftHistory){
        this.fftHistory = fftHistory;
        console.log(fftHistory.length);
    }
}