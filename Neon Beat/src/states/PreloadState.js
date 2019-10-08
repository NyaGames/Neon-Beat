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

var pathY = [];
var localMinimas = [];
var graphAmplitude;
var secondsFromMinimun;
var nextMinimum = 0;

var assets = [];
var counter = 0;
var totalAssets = 60 + 180 + 30 + 16 * 6 + 30 * 3;
var loadingAssets = true;
var generatingMap = false;


function PreloadState() {  
    this.angle = 0;   
  
    this.sphereAnimNumber = 60;
    this.backgroundNumber = 180;
    this.circleNumber = 30;
    this.successNumber = 16;
    this.successNumber2 = 16;
    this.successNumber3 = 16;
    this.failNumber = 16;
    this.failNumber2 = 16;
    this.failNumber3 = 16;
    this.lowestScoreNumber = 30;
    this.midScoreNumber = 30;
    this.highestScoreNumber = 30;
   
    var container;
    var canvas;
    this.enter = function () {
        console.log("[DEBUG] ***ENTERING LOADING STATE***");
        
        container = document.getElementById("container");
        canvas = createCanvas(1120, 630);
        canvas.position(0,0);
        canvas.parent(container);
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, chosenDifficulty.waveSmoothing);
        this.loadAssets();       
    }

    this.draw = function () {

        background(51);
        
        stroke(255);
        noFill();
        rect(10, 10, 200, 20);

        noStroke();
        fill(255, 100);

        var w = 200 * counter / totalAssets;
        rect(10, 10, w, 20);
           
        textSize(32);
        textAlign(CENTER);     
        if(loadingAssets){
            text('Loading assets', width / 2, height - 100);
        }else if(generatingMap){
            text('Generating map', width / 2, height - 100);
        }else{            
            text('Press any key to continue', width / 2, height - 100);
        }


        translate(width * 0.5, height * 0.5);
        rotate(this.angle);
        strokeWeight(4);
        stroke(255);
        line(0, 0, 100, 0);
        this.angle += 1;          
             
    }

    this.loadAssets = function () {
        for (let i = 0; i < this.sphereAnimNumber; i++) {
            if (i < 10) {
                //sphereAnimation.push(loadImage('assets/images/EsferaPrueba/0000' + i + '.png'));
                this.loadAsset("IMAGE", sphereAnimation, i, 'assets/images/EsferaPrueba/0000' + i + '.png');
            } else if (i < 100) {
                //sphereAnimation.push(loadImage('assets/images/EsferaPrueba/000' + i + '.png'));
                this.loadAsset("IMAGE", sphereAnimation, i, 'assets/images/EsferaPrueba/000' + i + '.png');
            } else if (i < 1000) {
                //sphereAnimation.push(loadImage('assets/images/EsferaPrueba/00' + i + '.png'));
                this.loadAsset("IMAGE", sphereAnimation, i, 'assets/images/EsferaPrueba/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.backgroundNumber; i++) {
            if (i < 10) {
                //backgroundAnimation.push(loadImage('assets/AfterEffect/NuevasParticulillas/0000' + i + '.png'));
                this.loadAsset("IMAGE", backgroundAnimation, i, 'assets/AfterEffect/NuevasParticulillas/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", backgroundAnimation, i, 'assets/AfterEffect/NuevasParticulillas/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", backgroundAnimation, i, 'assets/AfterEffect/NuevasParticulillas/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.circleNumber; i++) {
            if (i < 10) {
                //circleAnimation.push(loadImage('assets/AfterEffect/Circunferencia/0000' + i + '.png'));
                this.loadAsset("IMAGE", circleAnimation, i, 'assets/AfterEffect/Circunferencia/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", circleAnimation, i, 'assets/AfterEffect/Circunferencia/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", circleAnimation, i, 'assets/AfterEffect/Circunferencia/00' + i + '.png');
            }
        }

        //Animaciones de ACIERTO
        for (let i = 0; i < this.successNumber; i++) {
            if (i < 10) {
                //successAnimation.push(loadImage('assets/AfterEffect/Acierto/0000' + i + '.png'));
                this.loadAsset("IMAGE", successAnimation, i, 'assets/AfterEffect/Acierto/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", successAnimation, i, 'assets/AfterEffect/Acierto/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", successAnimation, i, 'assets/AfterEffect/Acierto/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.successNumber2; i++) {
            if (i < 10) {
                //successAnimation2.push(loadImage('assets/AfterEffect/Acierto2/0000' + i + '.png'));
                this.loadAsset("IMAGE", successAnimation2, i, 'assets/AfterEffect/Acierto2/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", successAnimation2, i, 'assets/AfterEffect/Acierto2/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", successAnimation2, i, 'assets/AfterEffect/Acierto2/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.successNumber3; i++) {
            if (i < 10) {
                //successAnimation3.push(loadImage('assets/AfterEffect/Acierto3/0000' + i + '.png'));
                this.loadAsset("IMAGE", successAnimation3, i, 'assets/AfterEffect/Acierto3/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", successAnimation3, i, 'assets/AfterEffect/Acierto3/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", successAnimation3, i, 'assets/AfterEffect/Acierto3/00' + i + '.png');
            }
        }


        // Animaciones de FALLO
        for (let i = 0; i < this.failNumber; i++) {
            if (i < 10) {
                //failAnimation.push(loadImage('assets/AfterEffect/fallo/0000' + i + '.png'));
                this.loadAsset("IMAGE", failAnimation, i, 'assets/AfterEffect/fallo/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", failAnimation, i, 'assets/AfterEffect/fallo/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", failAnimation, i, 'assets/AfterEffect/fallo/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.failNumber2; i++) {
            if (i < 10) {
                //failAnimation2.push(loadImage('assets/AfterEffect/fallo2/0000' + i + '.png'));
                this.loadAsset("IMAGE", failAnimation2, i, 'assets/AfterEffect/fallo2/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", failAnimation2, i, 'assets/AfterEffect/fallo2/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", failAnimation2, i, 'assets/AfterEffect/fallo2/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.failNumber3; i++) {
            if (i < 10) {
                //failAnimation3.push(loadImage('assets/AfterEffect/fallo3/0000' + i + '.png'));
                this.loadAsset("IMAGE", failAnimation3, i, 'assets/AfterEffect/fallo3/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", failAnimation3, i, 'assets/AfterEffect/fallo3/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", failAnimation3, i, 'assets/AfterEffect/fallo3/00' + i + '.png');
            }
        }

        //Animaciones de puntuaciones
        for (let i = 0; i < this.lowestScoreNumber; i++) {
            if (i < 10) {
                //lowestScoreAnimation.push(loadImage('assets/AfterEffect/100/0000' + i + '.png'));
                this.loadAsset("IMAGE", lowestScoreAnimation, i, 'assets/AfterEffect/100/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", lowestScoreAnimation, i, 'assets/AfterEffect/100/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", lowestScoreAnimation, i, 'assets/AfterEffect/100/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.midScoreNumber; i++) {
            if (i < 10) {
                //midScoreAnimation.push(loadImage('assets/AfterEffect/200/0000' + i + '.png'));
                this.loadAsset("IMAGE", midScoreAnimation, i, 'assets/AfterEffect/200/0000' + i + '.png');
            } else if (i < 100) {
                //midScoreAnimation.push(loadImage('assets/AfterEffect/200/000' + i + '.png'));
                this.loadAsset("IMAGE", midScoreAnimation, i, 'assets/AfterEffect/200/000' + i + '.png');
            } else if (i < 1000) {
                //midScoreAnimation.push(loadImage('assets/AfterEffect/200/00' + i + '.png'));
                this.loadAsset("IMAGE", midScoreAnimation, i, 'assets/AfterEffect/200/00' + i + '.png');
            }
        }

        for (let i = 0; i < this.highestScoreNumber; i++) {
            if (i < 10) {
                //highestScoreAnimation.push(loadImage('assets/AfterEffect/300/0000' + i + '.png'));
                this.loadAsset("IMAGE", highestScoreAnimation, i, 'assets/AfterEffect/300/0000' + i + '.png');
            } else if (i < 100) {
                this.loadAsset("IMAGE", highestScoreAnimation, i, 'assets/AfterEffect/300/000' + i + '.png');
            } else if (i < 1000) {
                this.loadAsset("IMAGE", highestScoreAnimation, i, 'assets/AfterEffect/300/00' + i + '.png');
            }
        }
    }

    this.progress = function (percentage) {
        console.log(floor(percentage * 100));
    }

    this.onloadingAssetsError = function (err) {
        console.log(err);
    }

    this.loadAsset = function (type, arr, index, url) {
        switch (type) {
            case "IMAGE":
                loadImage(url, this.assetLoaded, this.onloadingAssetsError)
                break;
        }

        this.assetLoaded = function (asset) {      
            assets[counter] = asset;
            arr[index] = asset;
            counter++;

            if (counter == totalAssets - 1) {
                this.loadingAssets = false;
                this.generatingMap = true;
                generateMap();
            }
        }
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
                        var minimum = new Minimum(i, pathY[i], false,circleAnimation,successAnimation,successAnimation2,successAnimation3,failAnimation,failAnimation2,failAnimation3,lowestScoreAnimation,midScoreAnimation,highestScoreAnimation);
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

        this.generatingMap = false;
    }

    this.keyPressed = function(){
        if(!this.loadingAssets && !this.generatingMap){
            mgr.showScene(GameState);
        }
    } 
}

function generateMap(){
    nbAudioContext.changeSmoothing(chosenDifficulty.waveSmoothing)
    secondsFromMinimun = chosenDifficulty.secondsFromMinimun;
    graphAmplitude = chosenDifficulty.graphAmplitude;    
    nbAudioContext.decodeAudio(songFile);
}