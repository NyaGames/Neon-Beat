var sphereAnimation = [];
var backgroundAnimation = [];
var circleAnimation = [];
var successAnimation = [];
var successAnimation2 = [];
var successAnimation3 = [];
var failAnimation = [];
var failAnimation2 = [];
var failAnimation3 = [];
var lowestScoreAnimation = [];
var midScoreAnimation = [];
var highestScoreAnimation = [];
var playerTrail = [];
var flash = [];

var minimumAnimation = [];

var comboAnimation = [];
var pointsAnimation =  [];

var pathY = [];
var localMinimas = [];
var graphAmplitude;
var secondsFromMinimun;

var counter = 0;
var totalAssets = 17;
var loadingAssets = false;
var assetsLoaded = false;
var generatingMap = false;
var mapGenerated = false;
var playerSecond;
var myFont;


function PreloadState() {  
    this.angle = 0;  
    this.animationIndex = 0; 
   
    var container;
    var canvas;

    var tutorial;

    this.enter = function () {
        console.log("[DEBUG] ***ENTERING LOADING STATE***");
        
        container = document.getElementById("container");

        canvas = createCanvas(ancho, alto);
        canvas.position(0,0);
        canvas.parent(container);

        tutorial = loadImage("assets/images/tutorial.png");

        if(!mapGenerated){
            nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, chosenDifficulty.waveSmoothing);
        }

        if(!assetsLoaded){
            loadingAssets = true;
            this.loadAssets();                
            myFont = loadFont('assets/fonts/gill-sans-ultra-bold-2.ttf');   
        }else{
            if(!mapGenerated){
                generatingMap = true;
                generateMap();
            }
        }

    }

    this.draw = function () {

        background(51);        
        
        imageMode(CORNER);
        image(tutorial, 0, 0, ancho, alto);

        let index = this.animationIndex % loadingScreen.length;      
        image(loadingScreen[index], ancho * 3.75 / 5, alto * 3.75/5, 350, 150);       

        fill(255, 200);
        textSize(32);
        textFont(p5.Font);
        textAlign(RIGHT);     
        if(loadingAssets){
            text('Cargando assets...', width * 3.75 / 5, height *4.5/5);      
        }else if(generatingMap){
            text('Generando mapa...', width * 3.75 / 5, height * 4.5/5);
        }else{            
            text('Pulsa cualquier tecla para continuar', width * 3.75 / 5, height * 4.5/5);
        }


        /*translate(width * 0.5, height * 0.5);
        rotate(this.angle);
        strokeWeight(4);
        stroke(255);
        line(0, 0, 100, 0);*/
        this.angle += 1;      
        this.animationIndex++; 
             
    }
   
    this.progress = function (percentage) {
        console.log(floor(percentage * 100));
    }

    this.onloadingAssetsError = function (err) {
        console.log(err);
    }    

    this.songLoaded = function(fft, d){
        songDuration = Math.round(d);
        let maxY = Math.max.apply(null, fft);        
        for (let i = 0; i < fft.length; i++) {
            let y = map(fft[i], 0, maxY, height * 4 / 5, height * 1 / 5);
            pathY.push(y);
        }

        //Buscamos mínimos locales
        let diff;
        let diffs = chosenDifficulty.diffs;
        let intervals = [
            [0, 60],
            [60, 130],
            [130, 260],
            [260, 520],
            [520, 1040],
            [1040, 1480],
            [1480, 2080],
            [2080, 3000],
            [3000, 4160],
            [4160, 6000],
            [6000, maxY]
        ]
        let minDistance = chosenDifficulty.minDistance;
        let previousMin = -1;

        for (let i = 1; i < fft.length - 1; i++) {

            let resta1 = fft[i] - fft[i - 1];
            let resta2 = fft[i] - fft[i + 1];

            let localMaxima;
            let localMinima;

            if (resta1 <= 0 && resta2 < 0) {
                //Mínimo local encontrado
                localMinima = fft[i];

                //Buscamos el intervalo en el que se encuentra y asignamos la diferencia que tiene que haber entre el mínimo y el máximo
                //inmediato
                let interval;
                for (let i = 0; i < intervals.length; i++) {
                    if (localMinima >= intervals[i][0] && localMinima < intervals[i][1]) {
                        interval = intervals[i]
                        diff = diffs[i];
                    }
                }

                //Buscamos máximo local
                for (let j = i; j < fft.length; j++) {
                    resta1 = fft[j] - fft[j - 1];
                    resta2 = fft[j] - fft[j + 1];

                    if (resta1 > 0 && resta2 > 0) {
                        //Máximo local encontrado;
                        localMaxima = fft[j];
                        break;
                    }
                }

                //Vemos si la diferencia de frecuencias entre el mínimo y el máximo es suficiente
                if (Math.abs(localMinima - localMaxima) >= diff) {
                    //Miramos si está lo suficientemente lejos del mínimo local anterior
                    if (Math.abs(i - previousMin) >= minDistance || previousMin == -1) {
                        var minimum = new Minimum(i, pathY[i], false,circleAnimation,successAnimation,successAnimation2,successAnimation3,failAnimation,failAnimation2,failAnimation3,lowestScoreAnimation,midScoreAnimation,highestScoreAnimation,minimumAnimation);
                        if((localMaxima - localMinima) >= 1000){
                            minimum.flash = true;
                        }
                        localMinimas.push(minimum);
                        localMinimas[localMinimas.length-1].index = localMinimas.length-1;
                        previousMin = i;
                    }
                }
            }
        }

        for (var j = 0; j < localMinimas.length; j++) {
            localMinimas[j].second = (songDuration * localMinimas[j].x) / ((pathY.length - 1)); //localMinimas[localMinimas.length - 1].x;
            localMinimas[j].second = Math.round(localMinimas[j].second * 10) / 10;
        }

        playerSecond = songDuration * 0 / ((pathY.length - 1) * graphAmplitude);
        playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal        

        generatingMap = false;
    }

    this.keyPressed = function(){
        if(!loadingAssets && !generatingMap){
            mgr.showScene(GameState);
        }
    } 

    this.loadSpritesheet = function (arr, numImages, width, height, url) {
        loadImage(url, assetLoaded, this.onLoadingError);

        function assetLoaded(asset) {
            let w = asset.width;
            let h = asset.height;

            let numCols = w / width;
            let numRows = h / height;

            for (let y = 0, i = 0; y < numRows, i < numImages; y++) {
                for (let x = 0; x < numCols; x++ , i++) {                  
                    let img = asset.get(x * width, y * height, width, height);
                    arr.push(img);
                }
            }

            counter++;

            if (counter == totalAssets) {
                loadingAssets = false;
                generatingMap = true;
                assetsLoaded = true;
                generateMap();
            }
        }
    }

    this.loadAssets = function () {

        this.loadSpritesheet(sphereAnimation, 60, 150, 150, "assets/images/Player/player.png");
        this.loadSpritesheet(backgroundAnimation, 180, 912, 513, "assets/AfterEffect/NuevasParticulillas/image1.png");
        this.loadSpritesheet(circleAnimation, 24, 300, 300, "assets/AfterEffect/Circunferencia/circunferencia_animation.png");

        this.loadSpritesheet(successAnimation,  16, 500, 500, "assets/AfterEffect/Aciertos/Acierto1_animation.png");
        this.loadSpritesheet(successAnimation2, 16, 500, 500, "assets/AfterEffect/Aciertos/Acierto2_animation.png");
        this.loadSpritesheet(successAnimation3, 16, 500, 500, "assets/AfterEffect/Aciertos/Acierto3_animation.png");

        this.loadSpritesheet(failAnimation,  15, 500, 500, "assets/AfterEffect/Fallos/fallo1_animation.png");
        this.loadSpritesheet(failAnimation2, 15, 500, 500, "assets/AfterEffect/Fallos/fallo2_animation.png");
        this.loadSpritesheet(failAnimation3, 15, 500, 500, "assets/AfterEffect/Fallos/fallo3_animation.png");

        this.loadSpritesheet(lowestScoreAnimation, 30, 500, 500, "assets/AfterEffect/Puntuaciones/100_animation.png");
        this.loadSpritesheet(midScoreAnimation, 30, 500, 500, "assets/AfterEffect/Puntuaciones/200_animation.png");
        this.loadSpritesheet(highestScoreAnimation, 30, 500, 500, "assets/AfterEffect/Puntuaciones/300_animation.png");

        this.loadSpritesheet(comboAnimation, 60, 500, 500, 'assets/AfterEffect/Combo/combo_animation.png'); 
        this.loadSpritesheet(pointsAnimation, 60, 500, 500, 'assets/AfterEffect/Puntos/points.png'); 

        this.loadSpritesheet(minimumAnimation, 50, 152, 152, 'assets/images/EsferaPequeñisima/esferaPequeña.png'); 

        this.loadSpritesheet(playerTrail, 1, 50, 50, 'assets/images/pelota.png');    
        this.loadSpritesheet(flash, 1, 600, 500, 'assets/images/flashes/flash.png'); 

           
    }

}

function generateMap(){
    nbAudioContext.changeSmoothing(chosenDifficulty.waveSmoothing)
    secondsFromMinimun = chosenDifficulty.secondsFromMinimun;
    graphAmplitude = chosenDifficulty.graphAmplitude;    
    nbAudioContext.decodeAudio(songFile);
    mapGenerated = true;
}

function reset(playAgain){
    resetGame();

    nbAudioContext.reset();
    mapGenerated = false;
    nbAudioContext = null;

    pathY = [];
    localMinimas = [];

    generatingMap = false;  

    if(!playAgain){
        songFile = null;
    }
}

function playAgain(){ 
    resetGame();    

    generatingMap = true;
    for (let i = 0; i < localMinimas.length; i++) {
        const element = localMinimas[i];
        element.reset();        
    }
    generatingMap = false;
}