function GameState() {

    var drawBool = false;
    var pathY = [];  
    var localMinimas = [];
    var timeOffSet = null;
    var pointer = new Pointer(0, 0, 20, img);

    var graphAmplitude = 4;
    var cameraOffset = 100;  

    this.enter = function () {
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, 0.9);

        console.log("[DEBUG] ***ENTERING GAME STATE***");
        createCanvas(600, 600);
        background(0)
    }

    this.songLoaded = function (fft) {
        for (let i = 0; i < fft.length; i++) {
            let y = map(fft[i], 0, Math.max.apply(null, fft), height * 4/5, height * 1/5);
            pathY.push(y);
        }

        let diff = 25;
        for (let i = 1; i < fft.length - 1; i++) {
            //Buscamos mínimos locales
            let resta1 = fft[i] - fft[i - 1];
            let resta2 = fft[i] - fft[i + 1];
            
            let localMaxima;
            let localMinima;
            if(resta1 <= 0 && resta2 < 0){             
                //Mínimo local encontrado, ahora buscamos el máximo local más cercano
                localMinima = fft[i];
                for (let j = i; j < fft.length; j++) {
                    resta1 = fft[j] - fft[j - 1];
                    resta2 = fft[j] - fft[j + 1];

                    if(resta1 > 0 && resta2 > 0){
                        localMaxima = fft[j];
                        break;
                    }
                    
                }

                if(Math.abs(localMinima - localMaxima) >= diff){
                    localMinimas.push([i, pathY[i]]);
                }
            }
        }

        nbAudioContext.playTrack();
        drawBool = true;    
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

        stroke(255, 0, 0);
        fill(255, 0, 0);
        for (let i = 0; i < localMinimas.length; i++) {           
            ellipse(localMinimas[i][0] * graphAmplitude, localMinimas[i][1], 10, 10);
        }
     
 
    }
}