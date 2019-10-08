function GameState() {
    //#region [rgba(255, 0, 0, 0.1)]Variables
    var canvas;
    var fade = 2;
    var flashBool =false;

    var timeOffSet = null;
    var pointer;
    
    var cameraOffset;

    var backgroundIndex = 0;

    var textPosX = 0;
    var textPosY = 30;
    var points = 0;

    //Gameplay variables
    var lowestScore = 100;
    var midScore = 200;
    var highestScore = 300;
    var combo = 1;
    var maximumCombo = 1;
    var damageOverTime = 0.1;
    var hpForSuccess = 5;
    var hpForFail = -7.5;

    //Minimum circles
   
    var playerAtMinimum = false;
    var startDiameter = 100;
    minimumSecondsRange = new Range(0, 0);

    //#endregion

    //#region[rgba(28, 155, 99, 0.1)]Setup
    this.enter = function () {
      
        console.log("[DEBUG] ***ENTERING GAME STATE***");
        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.parent(container);
        canvas.background(0);

        /*input = createFileInput(this.handleFileSelect)
        sel = createSelect();
        sel.option('Normal');
        sel.option('Easy');
        sel.option('Difficult');
        sel.changed(this.selectEvent);*/
  
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log("[DEBUG] ***MOBILE DEVICE DETECTED***");
            canvas = createCanvas(screen.availWidth, screen.availHeight - 50);
            canvas.position(0, 0);

            input.position(0, window.outerHeight - 30)
            sel.position(320, window.outerHeight - 30);

        } else {
            canvas = createCanvas(window.outerWidth * 0.7875 - window.outerWidth * 0.2085, window.outerHeight * 0.772 - window.outerHeight * 0.168);
            canvas.position(window.outerWidth * 0.2085, window.outerHeight * 0.168);
        }

        cameraOffset = width * 1 / 3;
        pointer = new Pointer(0, 0, 75, sphereAnimation); 

        nbAudioContext.playTrack();
        canvas.background(0);
    }
    //#endregion
   
    //#region[rgba(0, 0, 255, 0.1)]Draw
    this.draw = function () {

        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(backgroundAnimation[bgIndex], 0, 0, width, height);

        //flash
        if(flashBool){
            imageMode(CORNER);
            image(flash, 0, 0, width, height);
            flashBool=false;
        }

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
        minimumSecondsRange.max = localMinimas[nextMinimum].second; //+ secondsFromMinimun;

        //Si el jugador está en el rango del mínimo, puede pulsar la tecla y puntuar
        if (playerSecond >= minimumSecondsRange.min && playerSecond <= minimumSecondsRange.max) {
            localMinimas[nextMinimum].visited = true;
            playerAtMinimum = true;
            /*Si ese mínimo ya ha sido puntuado o fallado, dejo de estar en el mínimo
            if((localMinimas[nextMinimum].success || localMinimas[nextMinimum].fail) && nextMinimum + 1 < localMinimas.length){ 
                playerAtMinimum = false;
                nextMinimum++;
            }*/
        } else if (playerSecond > minimumSecondsRange.max && nextMinimum + 1 < localMinimas.length) { //Si me he pasado el mínimo,ya no estoy en ese mínimo
            if (!localMinimas[nextMinimum].success) { //Si ese mínimo no se ha acertado
                localMinimas[nextMinimum].fail = true;
                //en la siguiente pasada hay un flash
                flashBool = true;
                this.playerLoseHp();
                combo = 1;
            }
            if (playerSecond > minimumSecondsRange.max + secondsFromMinimun / 4) {
                playerAtMinimum = false;
                console.log("NO SE QUE PASA");
                nextMinimum++;
            }

        }


        //Update de los mínimos(pintarlos,sus círculos y sus textos)
        for (let i = 0; i < localMinimas.length; i++) {
            localMinimas[i].drawCircle(pointer.x, startDiameter, graphAmplitude);
            localMinimas[i].successOrFail(graphAmplitude);
            localMinimas[i].drawText(graphAmplitude);
            if (localMinimas[i].success) {
                stroke(0, 255, 0);
                fill(0, 255, 0);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            } else if (localMinimas[i].fail) {
                stroke(255, 0, 0);
                fill(255, 0, 0);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            } else {
                stroke(0, 0, 255);
                fill(0, 0, 255);
                ellipse(localMinimas[i].x * graphAmplitude, localMinimas[i].y, 10, 10);
            }
        }

        //Mueve el puntero del jugador     
        pointer.setPosition(playerIndex * graphAmplitude, pathY[playerIndex] - 10);
        pointer.display(damageOverTime);

        //Mira de qué color tiene que pintar al  jugador
        //pointer.actualIntervalo = this.getPlayerIntervalo();
        backgroundIndex++;

        this.checkEndGame();
        this.updateText();

    }

    //#endregion

    //#region[rgba(155, 28, 99, 0.1)]Eventos
    this.keyPressed = function () {
        //Si pulsamos la tecla y todavía no hemos acertado ni fallado, se considera acierto
        if (keyCode === 32) {
            this.handleInput();
        }
    }

    this.handleInput = function () {
        if (playerAtMinimum && !localMinimas[nextMinimum].success && !localMinimas[nextMinimum].fail) { // 32 = Barra espaciadora
            var rangeSize = startDiameter - localMinimas[nextMinimum].sizeForPerfectSuccsess;
            var firstRange = startDiameter - ((rangeSize / 5) * 3); //En los primeros 3 tercios del rango se puntúa 100
            var secondRange = localMinimas[nextMinimum].sizeForPerfectSuccsess + 3; //Hasta 3 pixeles antes de que se cierre el círculo se puntúa 200

            if (localMinimas[nextMinimum].size <= startDiameter && localMinimas[nextMinimum].size > firstRange) {
                points += lowestScore * combo;
                localMinimas[nextMinimum].score = 100;
            } else if (localMinimas[nextMinimum].size <= firstRange && localMinimas[nextMinimum].size > secondRange) {
                points += midScore * combo;
                localMinimas[nextMinimum].score = 200;
            } else if (localMinimas[nextMinimum].size <= secondRange && localMinimas[nextMinimum].size >= localMinimas[nextMinimum].sizeForPerfectSuccsess) {
                points += highestScore * combo;
                localMinimas[nextMinimum].score = 300;
            }
            localMinimas[nextMinimum].success = true;
            this.playerGetHp();
            localMinimas[nextMinimum].fail = false;
            combo++;
            if (combo > maximumCombo) {
                maximumCombo = combo;
            }

        } else if (keyCode === 32 && !playerAtMinimum && !localMinimas[nextMinimum].fail && nextMinimum + 1 < localMinimas.length) { //Si pulsamos la telca cuando no hemos llegado al mínimo, fallamos
            localMinimas[nextMinimum].success = false;
            this.playerLoseHp();
            console.log("LE DISTE PRONTO");
            localMinimas[nextMinimum].fail = true;
            combo = 1;
            //nextMinimum++;      
        }
    }

    this.touchStarted = function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.handleInput();
        }
    }

    this.selectEvent = function () {
        switch (sel.value()) {
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
    //#endregion

    //#region [rgba(28, 99, 155, 0.1)]Cosas de Dani
    this.playerGetHp = function () {
        pointer.actualHp += hpForSuccess;
        if (pointer.actualHp > pointer.maxHp) {
            pointer.actualHp = pointer.maxHp;
        }
    }

    this.playerLoseHp = function () {
        pointer.actualHp += hpForFail;
        /*if(pointer.actualHp <= 0){
            pointer.actualHp = 0;
            this.defeat();
        }*/
    }

    this.defeat = function(){
        container.remove();        
        mgr.showScene(DefeatState);
    }

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

        fill(255, 255, 255);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('Combo X' + combo, textPosX - 200, textPosY);


        fill(255, 255, 255);
        textSize(20);
        stroke('rgba(100%,0%,100%,0.0)');
        text(nextMinimum, localMinimas[nextMinimum].x * graphAmplitude, localMinimas[nextMinimum].y - 30);

        fill(255, 255, 255);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('Min ' + nextMinimum, textPosX - 500, textPosY);

    }

    this.checkEndGame = function () {
        if (playerSecond > songDuration - fade) {
            alpha = lerp(0, 255, (playerSecond - (songDuration - fade)) / (songDuration + 1-(songDuration - fade)));
            
            fill(0, 0, 0, alpha);
            ellipse(pointer.x, 0, 5000, 5000);
            if (playerSecond > songDuration + 1) {
                mgr.showScene(EndGameState);
                maxCombo = maximumCombo;
                finalScore = points;
            }
        }
    }
    //#endregion

}

class Range {

    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

}
