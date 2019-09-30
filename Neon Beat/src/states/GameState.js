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

    //Gameplay variables
    var nextMinimum = 0;
    var secondsFromMinimun = 0.1;
    var songDuration;
    var playerSecond;
    var playerAtMinimum = false;
    minimumSecondsRange = new Range(0,0);

    //Minimum circles
    var startDiameter = 50;
    var actualtDiameter = startDiameter;
    var radius = startDiameter/2;
    var recorridoEnSegundos; 
    var numLlamadasALaFuncion;
    var restaAlDiametro = 5;
    var timer;

    this.setup = function(){
        //frameRate(20);
    }

    this.enter = function () {
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, 0.95);

        console.log("[DEBUG] ***ENTERING GAME STATE***");
        createCanvas(1120, 630);
        input = createFileInput(handleFileSelect)
        input.position(8, height + 20);
        background(0);
    }

    this.processBuffer = function(){

    }

    this.songLoaded = function (fft,d) {
        songDuration = Math.round(d);
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

        for(var i = 0;i < localMinimas.length;i++){
            localMinimas[i].second = (songDuration * localMinimas[i].x)/((pathY.length - 1)); //localMinimas[localMinimas.length - 1].x;
            localMinimas[i].second = Math.round(localMinimas[i].second * 10)/10;
        }

        playerSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
        playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal

        recorridoEnSegundos = localMinimas[nextMinimum].second - playerSecond;

        nbAudioContext.playTrack();
        drawBool = true;    
        
    }

    this.getPlayerSecond = function(){
        //Calculamos en qué segundo está el jugador 
        playerSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
        playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal
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

        this.getPlayerSecond();
        //Calculamos el rango para el mínimo, en el que el jugador puede puntuar
        minimumSecondsRange.min = localMinimas[nextMinimum].second - secondsFromMinimun;
        minimumSecondsRange.max = localMinimas[nextMinimum].second + secondsFromMinimun;

        //Si el jugador está en el rango del mínimo, puede pulsar la tecla y puntuar
        if(playerSecond >= minimumSecondsRange.min && playerSecond <= minimumSecondsRange.max){
            playerAtMinimum = true;
            actualtDiameter = startDiameter;
        }else if(playerSecond > minimumSecondsRange.max){
            playerAtMinimum = false;
            nextMinimum++;
            console.log("Nuevo mínimo:" + nextMinimum);
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

        stroke(0, 0, 255);
        ellipse(localMinimas[nextMinimum].x * graphAmplitude, localMinimas[nextMinimum].y, actualtDiameter, actualtDiameter);  
        
        stroke(255, 0, 0);
        for (let i = 0; i < localMinimas.length; i++) {   
            fill(255, 255, 255);  
            textSize(15);
            stroke('rgba(100%,0%,100%,0.0)');
            text(i,localMinimas[i].x * graphAmplitude,localMinimas[i].y - 15);  
            if(!localMinimas[i].visited){
                fill(255, 0, 0);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            }else{
                fill(0, 255, 0);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            }
           
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
 
    }

    this.keyPressed = function(){
        if (keyCode === 32 && playerAtMinimum && !localMinimas[nextMinimum].visited) { // 32 = Barra espaciadora
            localMinimas[nextMinimum].visited = true;
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

  class Range{

    constructor(min,max){
        this.min = min;
        this.max = max;
    }

  }