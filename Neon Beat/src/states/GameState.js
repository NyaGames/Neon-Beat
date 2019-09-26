function GameState() {

    var drawBool = false;
    var pathY = [];  
    var localMinimas = [];
    var timeOffSet = null;
    var pointer = new Pointer(0, 0, 75, sphereAnimation);

    var graphAmplitude = 4;
    var input;
    var cameraOffset = 100;  

    var backgroundIndex = 0;

    var textPosX = 0;
    var textPosY = 30;
    var textPosIncrement = 10;
    var points = 0;

    var nextMinimum = 1;
    var distanceFromMinimun = 4;

    this.enter = function () {
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, 0.95);

        console.log("[DEBUG] ***ENTERING GAME STATE***");
        createCanvas(1120, 630);
        input = createFileInput(handleFileSelect)
        input.position(8, height + 20);
        background(0);
    }

    this.songLoaded = function (fft) {
        let maxY = Math.max.apply(null, fft);
        for (let i = 0; i < fft.length; i++) {
            let y = map(fft[i], 0, maxY, height * 4/5, height * 1/5);
            pathY.push(y);
        }

        let diff = 50;
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
                    var minimum = new Minimum(i,pathY[i],false);
                    //localMinimas.push([i, pathY[i]]);
                    localMinimas.push(minimum);
                }
            }
        }

        nbAudioContext.playTrack();
        drawBool = true;    
    }


    this.draw = function () {      
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);  
        background(0);

        imageMode(CORNER); 
        image(backgroundAnimation[bgIndex], 0, 0, width, height);
       

        if (!drawBool) return;

        if (timeOffSet === null) {
            timeOffSet = nbAudioContext.currentTime();
        }

        var currentTime = nbAudioContext.currentTime();
        let index = Math.floor((pathY.length) * (currentTime - timeOffSet) / nbAudioContext.getTrackDuration());
        
        translate(-index * graphAmplitude + cameraOffset, 0); 

        //Move text position(a la vez que la cámara o empieza a rebotar D:)
        textPosX = index * graphAmplitude + cameraOffset;

        pointer.setPosition(index * graphAmplitude, pathY[index] - 10);      
        pointer.display();

        //////////////////////////////DANI//////////////////////
        console.log(pointer.x);
        //Si no se ha visitado el siguiente mínimo y el jugador está en ese rango
        
            var timeForNextDraw = 1/getFrameRate();
            var nextIndex = Math.floor((pathY.length) * ((currentTime + timeForNextDraw)  - timeOffSet) / nbAudioContext.getTrackDuration());
            var pointerNextPosition = nextIndex * graphAmplitude;
        
        if(!localMinimas[nextMinimum].visited && pointer.x <= localMinimas[nextMinimum].x && localMinimas[nextMinimum].x <= pointerNextPosition){
            localMinimas[nextMinimum].visited = true;
            nextMinimum++;
        }
        //////////////////////////////7DANI//////////////////////

        stroke(115, 178, 199);
        strokeWeight(4)
        noFill();
        beginShape();    

        for (let i = 0; i < pathY.length; i++) {            
            vertex(i * graphAmplitude, pathY[i]);
        }

        endShape();    

        stroke(255, 0, 0);
        fill(255, 0, 0);
        for (let i = 0; i < localMinimas.length; i++) {           
            ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
        }
     
        backgroundIndex++;

        this.updateText();

        

    }

    //Text
    this.updateText = function(){
        fill(255, 255, 255);  
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('Points:' + points,textPosX,textPosY);  

        //Next minimun
        fill(255, 255, 255);  
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('Next minimun:' + nextMinimum,textPosX+200,textPosY);  

        fill(255, 255, 255);  
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text(pointer.x + "/" + localMinimas[nextMinimum].x,textPosX+600,textPosY);  
    }

    this.keyPressed = function(){
        if (keyCode === 32) { // 32 = Barra espaciadora
            points += 1;
        }
    }

}


function handleFileSelect(evt) {
    var f = evt.file;
  
    //Cargar el archivo    
    if (f.type === "audio/aiff" || true) {
        var reader = new FileReader();
        reader.onload = function(file){
            nbAudioContext.decodeAudio(file);
        }
        reader.readAsArrayBuffer(f);
    } else {
        trow("No good file");
    }
    
  }