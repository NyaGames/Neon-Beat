function GameState() {

    var drawBool = false;
    var pathY = [];  
    var timeOffSet = null;
    var pointer = new Pointer(0, 0, 20, img);

    var graphAmplitude = 4;
    var cameraOffset = 100;  

    this.enter = function () {
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, 0.8);

        console.log("[DEBUG] ***ENTERING GAME STATE***");
        createCanvas(600, 600);
        background(0)
    }

    this.songLoaded = function (fft) {
        for (let i = 0; i < fft.length; i++) {
            let y = map(fft[i], 0, Math.max.apply(null, fft), height * 4/5, height * 1/5);
            pathY.push(y);
        }

        nbAudioContext.playTrack();
        drawBool = true;

        pixelsPerSecond = fft.length / nbAudioContext.getTrackDuration()

        frameRate(Math.round(pixelsPerSecond));
    }


    this.draw = function () {
        background(0);
 

        if (!drawBool) return;

        if (timeOffSet === null) {
            timeOffSet = nbAudioContext.currentTime();
        }

        let index = Math.floor((pathY.length) * (nbAudioContext.currentTime() - timeOffSet) / nbAudioContext.getTrackDuration());
        
        translate(-index * graphAmplitude + cameraOffset, 0); 

        pointer.setPosition(index * graphAmplitude, pathY[index] - 10);      
        pointer.display();

        stroke(255);
        noFill();
        beginShape();

        for (let i = 0; i < pathY.length; i++) {            
            vertex(i * graphAmplitude, pathY[i]);
        }

        endShape();    
     
 
    }
}