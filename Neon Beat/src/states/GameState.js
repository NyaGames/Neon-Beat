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
    var hpFor100 = 3;
    var hpFor200 = 5;
    var hpFor300 = 7;
    var hpForFail = -7.5;

    //Minimum circles
   
    var playerAtMinimum = false;
    var startDiameter = 100;
    minimumSecondsRange = new Range(0, 0);

    //Animaciones
    var incrementCombo = 0;
    var indexCombo = 0;
    var incrementPoints=0;
    var indexPoints = 0;

    //#endregion

    //#region[rgba(28, 155, 99, 0.1)]Setup
    this.enter = function () {            
        console.log("[DEBUG] ***ENTERING GAME STATE***");
        container = document.getElementById("container");

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.position(0,0);
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
        if(flashBool){
            imageMode(CORNER);
            image(flash[0], 0, 0, width, height);
            flashBool = false;
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
        } else if (playerSecond > minimumSecondsRange.max && nextMinimum + 1 < localMinimas.length) { //Si me he pasado el mínimo,ya no estoy en ese mínimo
            if (!localMinimas[nextMinimum].success) { //Si ese mínimo no se ha acertado
                localMinimas[nextMinimum].fail = true;
                this.playerLoseHp();
                combo = 1;
            }
            if (playerSecond > minimumSecondsRange.max + 0.08) {
                playerAtMinimum = false;
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
            this.handleInput(); // 32 = Barra espaciadora
        }
    }

    this.handleInput = function () {
        if (playerAtMinimum && !localMinimas[nextMinimum].success && !localMinimas[nextMinimum].fail) { 
            //flash
            if(localMinimas[nextMinimum].flash){
                flashBool=true;
            }

            var firstRange = new Range(localMinimas[nextMinimum].second - secondsFromMinimun,localMinimas[nextMinimum].second - (2*secondsFromMinimun/3));
            var secondRange = new Range(firstRange.max,localMinimas[nextMinimum].second - secondsFromMinimun/3);
            var thirdRange = new Range(secondRange.max,localMinimas[nextMinimum].second);

            if (playerSecond >= firstRange.min && playerSecond <= firstRange.max) {
                points += lowestScore * combo;
                localMinimas[nextMinimum].score = 100;
                this.playerGetHp(100);
            } else if (playerSecond >= secondRange.min && playerSecond <= secondRange.max) {
                points += midScore * combo;
                localMinimas[nextMinimum].score = 200;
                this.playerGetHp(200);
            } else if (playerSecond >= thirdRange.min && playerSecond <= thirdRange.max) {
                points += highestScore * combo;
                localMinimas[nextMinimum].score = 300;
                this.playerGetHp(300);
            }
            localMinimas[nextMinimum].success = true;
            
            localMinimas[nextMinimum].fail = false;
            combo++;
            if (combo > maximumCombo) {
                maximumCombo = combo;
            }

        } else if (keyCode === 32 && !playerAtMinimum && !localMinimas[nextMinimum].fail && nextMinimum + 1 < localMinimas.length) { //Si pulsamos la telca cuando no hemos llegado al mínimo, fallamos
            localMinimas[nextMinimum].success = false;
            this.playerLoseHp();
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
    this.playerGetHp = function (points) {
        switch(points){
            case 100:
                pointer.actualHp += hpFor100;
                break;
            case 200:
                pointer.actualHp += hpFor200;
                break;
            case 300:
                pointer.actualHp += hpFor300;
                break;
        }
        if (pointer.actualHp > pointer.maxHp) {
            pointer.actualHp = pointer.maxHp;
        }
    }

    this.playerLoseHp = function () {
        pointer.actualHp += hpForFail;
        if(pointer.actualHp <= 0){
            pointer.actualHp = 0;
            //this.defeat();
        }
    }

    this.defeat = function(){
        canvas.remove();        
        mgr.showScene(DefeatState);
    }

    this.getPlayerSecond = function () {
        //Calculamos en qué segundo está el jugador 
        playerSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
        playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal
    }

    //Text
    this.updateText = function () {
        //Points
        incrementPoints += 4;
        let index1 = Math.floor(indexPoints) % pointsAnimation.length;
        imageMode(CENTER);       
        image(pointsAnimation[index1], textPosX - 50, textPosY + 20, 200, 200);      
        indexPoints += 0.6; 

        fill(255, 255, 255);
        textFont(myFont);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text(points,textPosX + 200, textPosY);   

        //Combo
        incrementCombo += 4;
        let index = Math.floor(indexCombo) % comboAnimation.length;
        imageMode(CENTER);       
        image(comboAnimation[index], textPosX - 400, textPosY, 200, 200);      
        indexCombo += 0.6;    

        fill(255, 255, 255);
        textSize(30);
        stroke('rgba(100%,0%,100%,0.0)');
        text('X' + combo, textPosX - 300, textPosY + 20);
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
