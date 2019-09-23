var NeonBeat = NeonBeat || {};
NeonBeat.Game = function(){};

NeonBeat.Game.prototype = {
    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME** state");
        }
        
        this.fftHistory;
        this.songReady = false;
    },

    preload: function(){
       
    },

    create: function(){
        this.furro = this.add.sprite(0, 0, 'furro');
        this.furro.scale.setTo(0.05,0.05);
        //this.state.start('EndGame');  
    },

    update:function(){
        
        if(this.path != undefined){
            this.furro.x = this.path[this.pos].x;
            this.furro.y = this.path[this.pos].y;
    
            this.pos += 400;
    
            if(this.pos >= this.path.length){
                this.pos = 0;
            }
        }
       


    },

    //Recalcula las posiciones para que quepan en la pantalla
    drawWave:function(fftHistory){
        NeonBeat.game.scale.setGameSize(fftHistory.length, 600);
        
        this.waveY = fftHistory;
        this.maxValueOnY = Math.max.apply(Math,this.waveY) + 5000;
        this.startValueOnY = 3*NeonBeat.game.height/4;

        this.waveX = new Array(this.waveY.length);
        for(var i = 0;i < this.waveY.length;i++){
            this.waveX[i] = i;
            var x = (NeonBeat.game.width * this.waveX[i])/this.waveX.length
            this.waveX[i] = x;
            var y = (NeonBeat.game.height * this.waveY[i])/this.maxValueOnY;
            if(y == 0){
                y = this.startValueOnY
            }else if(y > 0){
                y = this.startValueOnY - y
            }else{
                y = this.startValueOnY + y
            }
            this.waveY[i] = y; 
        }
        //Draw wave
        NeonBeat.game.stage.backgroundColor = '#204090';
        this.bmd = NeonBeat.game.add.bitmapData(NeonBeat.game.width, NeonBeat.game.height);
        this.bmd.addToWorld();
 
        this.plot();
    },

    //Dibuja la curva y los puntos
    plot: function () {
 
        this.bmd.clear();
         
        var x = 0.004 / NeonBeat.game.width;

        NeonBeat.Game.prototype.path = [];
         
        for (var i = 0; i <= 1; i += x)
        {
            //var px = this.math.linearInterpolation(this.waveX, i);
            //var py = this.math.linearInterpolation(this.waveY, i);
            
            //var px = this.math.bezierInterpolation(this.waveX, i);
            //var py = this.math.bezierInterpolation(this.waveY, i);
            
            var px = NeonBeat.game.math.catmullRomInterpolation(this.waveX, i);
            var py = NeonBeat.game.math.catmullRomInterpolation(this.waveY, i);
            
            this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
            
            NeonBeat.Game.prototype.pos = 0;
            NeonBeat.Game.prototype.path.push( { x: px, y: py });

        }
         
        //for (var p = this.ratio; p < this.waveX.length; p += this.ratio)
        for (var p = 0; p < this.waveX.length; p++)
        {
            this.bmd.rect(this.waveX[p]-3,this.waveY[p]-3, 3, 3, 'rgba(255, 0, 0, 1)');
            //if((Math.abs(this.waveY[p]  - this.waveY[p - this.ratio]) <=  this.difference) || (Math.abs(this.waveY[p]  - this.waveY[p - this.ratio]) >=  this.difference)){
                //this.bmd.rect(this.waveX[p]-3,this.waveY[p]-3, 3, 3, 'rgba(255, 0, 0, 1)');
            //}
        }
         
    },

    songAdded(file){
        let graphGenerator = new GraphGenerator(1024, 48000, NeonBeat.Game.prototype.songLoaded);
        graphGenerator.decodeAudio(file);
    },

    songLoaded(fftHistory){
        this.fftHistory = fftHistory;
        console.log(fftHistory.length);
        NeonBeat.Game.prototype.drawWave(this.fftHistory);
    },


}