var NeonBeat = NeonBeat || {};
NeonBeat.GameState = function(){};

NeonBeat.GameState.prototype = {   

    init: function(){
        if (NeonBeat.global.DEBUG_MODE) {
			console.log("[DEBUG] Entering **GAME STATE** state");
        }
        
        this.fftHistory;
        this.songReady = false;      
        this.timeOffset = null;
        this.graphAmplitude = 2;
    },

    preload: function(){
       
    },

    create: function(){
        this.pelota = this.add.sprite(0, 0, 'pelota');
        this.pelota.scale.setTo(0.5,0.5);

        NeonBeat.game.physics.enable(this.pelota, Phaser.Physics.ARCADE);
           
        this.pelota.particleEmitter = this.add.emitter(this.pelota.body.x, this.pelota.body.y, 100);
        this.pelota.particleEmitter.makeParticles('pelota');
        this.pelota.particleEmitter.setAlpha(0.6, 0, 150);
        this.pelota.particleEmitter.setSize(0.5, 0.5);
        this.pelota.particleEmitter.setScale(0.5, 0.5, 0.5, 0.5);
        this.pelota.particleEmitter.setXSpeed(0, 0);
        this.pelota.particleEmitter.setYSpeed(0, 0);
        this.pelota.particleEmitter.start(false, 100, 10);

        this.game.camera.follow(this.pelota);
        this.game.camera.deadzone = new Phaser.Rectangle(0, 0, NeonBeat.game.width* 1/5, NeonBeat.game.height);
        //this.state.start('EndGame');  

        NeonBeat.game.amplitudOnda = 2;

    },

    update:function(){
        
        if(this.path != undefined){ 
            let audioCtx = NeonBeat.global.nbAudioCtx.getAudioContext();

            if(this.timeOffset === null) this.timeOffset = audioCtx.currentTime;
            let index = Math.floor(this.path.length * (audioCtx.currentTime - this.timeOffset) / NeonBeat.global.nbAudioCtx.getTrackDuration());
            
            //console.log(index);   
        
            this.pelota.x = this.path[index].x- (this.pelota.body.width / 2);
            this.pelota.y = this.path[index].y- (this.pelota.body.height / 2);
      
            this.pelota.particleEmitter.x = this.pelota.body.x + (this.pelota.body.width / 2);
            this.pelota.particleEmitter.y = this.pelota.body.y + (this.pelota.body.height / 2);
    
            this.pos += 200;
    
            if(this.pos >= this.path.length){
                this.pos = 0;
            }
        }    


    },

    //Recalcula las posiciones para que quepan en la pantalla
    drawWave:function(fftHistory){
        //NeonBeat.game.scale.setGameSize(fftHistory.length, NeonBeat.game.height);
        NeonBeat.game.world.setBounds(0, 0, fftHistory.length * NeonBeat.game.amplitudOnda, 600);
        
        this.waveY = fftHistory;
        this.maxValueOnY = Math.max.apply(Math,this.waveY) + 5000;
        this.startValueOnY = 3* NeonBeat.game.height / 4;

        this.waveX = new Array(this.waveY.length);
        for(var i = 0;i < this.waveY.length;i++){
            this.waveX[i] = i * NeonBeat.game.amplitudOnda;
            var x = (NeonBeat.game.world.width * this.waveX[i])/this.waveX.length ;
            this.waveX[i] = x;
            var y = ( NeonBeat.game.world.height * this.waveY[i])/this.maxValueOnY;
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
        this.bmd = NeonBeat.game.add.bitmapData(NeonBeat.game.world.width,  NeonBeat.game.world.height);
        this.bmd.addToWorld();
 
        this.plot();
        NeonBeat.global.nbAudioCtx.playTrack();       
        NeonBeat.global.nbAudioCtx.getAudioContext().currentTime = 0;        
    },

    //Dibuja la curva y los puntos
    plot: function () {
 
        this.bmd.clear();
         
        var x = 0.1 /  NeonBeat.game.world.width;

        NeonBeat.GameState.prototype.path = [];
         
        /*var px0 = NeonBeat.game.math.catmullRomInterpolation(this.waveX, 0);
        var py0 = NeonBeat.game.math.catmullRomInterpolation(this.waveY, 0);
        var graphics = NeonBeat.game.add.graphics(px0,py0);*/
        for (var i = x; i <= 1; i += x)
        {
            //var px = this.math.linearInterpolation(this.waveX, i);
            //var py = this.math.linearInterpolation(this.waveY, i);
            
            //var px = this.math.bezierInterpolation(this.waveX, i);
            //var py = this.math.bezierInterpolation(this.waveY, i);
            
            var px = NeonBeat.game.math.catmullRomInterpolation(this.waveX, i);
            var py = NeonBeat.game.math.catmullRomInterpolation(this.waveY, i);
            /*var line = new Phaser.Line(px0, py0, px, py);
            
            this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
            
            NeonBeat.GameState.prototype.pos = 0;
            NeonBeat.GameState.prototype.path.push( { x: px, y: py });
            //var graphics = NeonBeat.game.add.graphics(line.start.x,line.start.y);
            graphics.lineStyle(1, 0xffd900, 1);
            graphics.moveTo(line.start.x,line.start.y);﻿//moving position of graphic if you draw mulitple lines
            graphics.lineTo(line.end.x,line.end.y);
            graphics.endFill();*/

            px0 = px;
            py0 = py;
            //this.bmd.rect(px, py, 1, 1, 'rgba(255, 255, 255, 1)');
            var neonSprite = NeonBeat.game.add.sprite(px, py, 'neonLine');
            neonSprite.scale.setTo(0.5,0.5);

            NeonBeat.GameState.prototype.pos = 0;
            NeonBeat.GameState.prototype.path.push( { x: px, y: py });

        }
         
        //for (var p = this.ratio; p < this.waveX.length; p += this.ratio)
        for (var p = 1; p < this.path.length - 1; p++)
        {
            //this.bmd.rect(this.waveX[p]-3,this.waveY[p]-3, 3, 3, 'rgba(255, 0, 0, 1)');
            var resta1 = this.path[p].y - this.path[p-1].y;
            var resta2 = this.path[p].y - this.path[p+1].y;
            var diff = 0.0000001;
            if((resta1 > 0) && (resta2 > 0)){
                if((Math.abs(resta1) > diff  && Math.abs(resta2) > diff)){
                    this.bmd.rect(this.path[p].x-3,this.path[p].y-3, 3, 3, 'rgba(255, 0, 0, 1)');
                }
            }
        }
         
    },

    songAdded(file){               
        NeonBeat.global.nbAudioCtx.decodeAudio(file);
    },

    songLoaded(fftHistory){
        this.fftHistory = fftHistory;       
       
        NeonBeat.GameState.prototype.drawWave(this.fftHistory);
    },


}