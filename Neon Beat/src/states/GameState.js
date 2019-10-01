function GameState() {

    //#region [rgba(255, 0, 0, 0.1)]Variables
    var difficulties = {
        easy:{
            graphAmplitude: 4,
            secondsFromMinimun: 0.1,
            waveSmoothing: 0.95,
            diffs: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            minDistance: 10,
        },
        normal: {
            graphAmplitude: 6,
            secondsFromMinimun: 0.1,
            waveSmoothing: 0.9,
            diffs: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            minDistance: 10,
        },
        difficult: {
            graphAmplitude: 8,
            secondsFromMinimun: 0.1,
            waveSmoothing: 0.6,
            diffs: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            minDistance: 10,
        }
    }

    var pathY = [];
    var localMinimas = [];
    var chosenDifficulty;
    var graphAmplitude;
    var secondsFromMinimun;
    var canvas;

    var drawBool = false;   
    var timeOffSet = null;
    var pointer = new Pointer(0, 0, 75, sphereAnimation);

    var input;
    var sel;
    var cameraOffset;

    var backgroundIndex = 0;

    var textPosX = 0;
    var textPosY = 30;
    var points = 0;

    //Gameplay variables
    var nextMinimum = 0;
    var songDuration;
    var playerSecond;
    var playerAtMinimum = false;
    minimumSecondsRange = new Range(0, 0);

    //Minimum circles
    var startDiameter = 100;
    var actualtDiameter = startDiameter;
    var circleSeconds = 3;
    //#endregion

    //#region[rgba(28, 155, 99, 0.1)]Setup
    this.enter = function () {
        console.log("[DEBUG] ***ENTERING GAME STATE***");
        canvas = createCanvas(912, 513);
        canvas.position(window.outerWidth * 0.20, window.outerHeight * 0.16);
        input = createFileInput(this.handleFileSelect)
        var pruebaBoton = createDiv()     
        pruebaBoton.position(window.outerWidth * 0.20, window.outerHeight * 0.16)
        pruebaBoton.elt.style.zindex = 1
        //pruebaBoton.elt.style.background-image = url('assets/images/gameplay/fondo_gameplay.png');
        sel = createSelect();
        sel.option('Normal');
        sel.option('Easy');
        sel.option('Difficult');
        sel.changed(this.selectEvent);
        canvas.background(0);
        cameraOffset = width * 1 / 3;

        chosenDifficulty = difficulties.normal;
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, chosenDifficulty.waveSmoothing);
    }    
    //#endregion

    //#region [rgba(0, 255, 0, 0.1)]Procesamiento de la onda y mínimos
    this.songLoaded = function (fft, d) {    
        songDuration = Math.round(d);
        let maxY = Math.max.apply(null, fft);
        console.log(maxY);
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
                        var minimum = new Minimum(i, pathY[i], false);
                        //localMinimas.push([i, pathY[i]]);
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

        playerSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
        playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal

        recorridoEnSegundos = localMinimas[nextMinimum].second - playerSecond;

        nbAudioContext.playTrack();
        drawBool = true;

    }
    //#endregion
   
    //#region[rgba(0, 0, 255, 0.1)]Draw
    this.draw = function () {
        
        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(backgroundAnimation[bgIndex], 0, 0, width, height);

        if (!drawBool) return;

        //Offset para sincronizar los tiempos a la hora de empezar la canción
        if (timeOffSet === null) {
            timeOffSet = nbAudioContext.currentTime();
        }

        //Mueve el canavas para crear un efecto de 'cámara'
        let playerIndex = Math.floor((pathY.length) * (nbAudioContext.currentTime() - timeOffSet) / nbAudioContext.getTrackDuration());
        translate(-playerIndex * graphAmplitude + cameraOffset, 0);


        //Colores de las lineas para crear un efecto de neón.            
        let colors = [        
            [1, 15, 195, 200],
            [0, 239, 250, 255],
            [1, 15, 195, 200]
        ]

        //Límites del canvas en los que se va a dibujar la onda. Se dibuja solo la parte que se está enseñando
        let limite1 = Math.floor(playerIndex - cameraOffset);
        let tmp = 103.333 * graphAmplitude * width / 1120;
        let limite2 = Math.floor(limite1 + width) - tmp;

        //Se dibujan varias lineas de distinto color para crear el efecto neón
        for (let offset = (-colors.length - 1) * 0.5, j = 0; j < colors.length; offset++ , j++) {

            stroke(colors[j]);
            strokeWeight(1)
            noFill();
            beginShape();

            //Solo se dibuja la linea dentro de la parte visible del canvas
            for (var i = limite1; i < limite2; i++) {
                if (i < 0) {
                    //Línea recta para la parte del canvas en la que la canción no ha empezado todavía
                    vertex(i, height * 4 / 5 + offset);
                }
                else {
                    //Onda
                    vertex(i * graphAmplitude, pathY[i] + offset);
                }
            }

            endShape();
        }

        //Move text position(a la vez que la cámara o empieza a rebotar D:)
        textPosX = playerIndex * graphAmplitude + cameraOffset;

        this.getPlayerSecond();
        //Calculamos el rango para el mínimo, en el que el jugador puede puntuar
        minimumSecondsRange.min = localMinimas[nextMinimum].second - secondsFromMinimun;
        minimumSecondsRange.max = localMinimas[nextMinimum].second + secondsFromMinimun;

        //Si el jugador está en el rango del mínimo, puede pulsar la tecla y puntuar
        if (playerSecond >= minimumSecondsRange.min && playerSecond <= minimumSecondsRange.max) {
            playerAtMinimum = true;
        } else if (playerSecond > minimumSecondsRange.max) {
            playerAtMinimum = false;
            nextMinimum++;
            console.log("Nuevo mínimo:" + nextMinimum);
        }  

        //var newDiameter = (startDiameter * playerSecond)/circleSeconds;
        //stroke(0, 0, 255);
        //ellipse(localMinimas[nextMinimum].x * graphAmplitude, localMinimas[nextMinimum].y, newDiameter, newDiameter);
        for (let i = 0; i < localMinimas.length; i++) {
            localMinimas[i].drawCircle(pointer.x,startDiameter,graphAmplitude);
           if (!localMinimas[i].visited) {
                stroke(255, 0, 0);
                fill(255, 0, 0);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            } else {
                stroke(0, 255, 0);
                fill(0, 255, 0);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            }

        }

        //Mueve el puntero del jugador     
        pointer.setPosition(playerIndex * graphAmplitude, pathY[playerIndex] - 10);
        pointer.display();

        backgroundIndex++;

        this.updateText();
    }

    //#endregion

    //#region[rgba(155, 28, 99, 0.1)]Eventos
    this.keyPressed = function () {
        if (keyCode === 32 && playerAtMinimum && !localMinimas[nextMinimum].visited) { // 32 = Barra espaciadora
            localMinimas[nextMinimum].visited = true;
            points += 1;
        }
    }

    this.selectEvent = function () {
        switch(sel.value()){
            case 'Normal':
                chosenDifficulty = difficulties.normal;
                break;
            case 'Easy':
                chosenDifficulty = difficulties.easy;
                break;
            case 'Difficult':
                chosenDifficulty = difficulties.difficult;
                break;
        }
    }

    this.handleFileSelect = function(evt) {
        var f = evt.file;   
        secondsFromMinimun = chosenDifficulty.secondsFromMinimun;
        graphAmplitude = chosenDifficulty.graphAmplitude;    
        nbAudioContext.changeSmoothing(chosenDifficulty.waveSmoothing)
        //Cargar el archivo    
        if (f.type === "audio/aiff" || true) {
            var reader = new FileReader();
            reader.onload = function (file) {
                nbAudioContext.decodeAudio(file);
            }
            reader.readAsArrayBuffer(f);
        } else {
            trow("No good file");
        }    
    }
    //#endregion

    //#region [rgba(28, 99, 155, 0.1)]Cosas de Dani
    this.getPlayerSecond = function () {
        //Calculamos en qué segundo está el jugador 
        playerSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
        playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal
    }

    //Text
    this.updateText = function () {
        fill(255, 255, 255);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('Points:' + points, textPosX, textPosY);

    }
    //#endregion

}

class Range {

    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

}
