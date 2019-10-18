//#region [rgba(255, 0, 0, 0.1)]Variables
    var canvas;
    var fade = 2;
    var flashBool = false;

    var timeOffSet = null;
    var pointer;
    
    var cameraOffset;

    var backgroundIndex = 0;

    //Gameplay variables
    var lowestScore = 100;
    var midScore = 200;
    var highestScore = 300;
    var combo = 1;
    var points = 0;
    var maximumCombo = 1;
    var damageOverTime = 0.1;
    var hpFor100 = 3;
    var hpFor200 = 5;
    var hpFor300 = 7;  
    var hpForFail = -7.5; 

    var endSecond;

    //Minimum circles  
    var playerAtMinimum = false; 
    var nextMinimum = 0;

    //Animaciones
    var incrementCombo = 0;
    var indexCombo = 0;
    var incrementPoints=0;
    var indexPoints = 0;

    var startDelay = 3;
    var countDown = startDelay;
    var gameStarted = false;

    var interval;

function GameState() {   

    var startDiameter = width / 6;
    var minimumSecondsRange = new Range(0, 0);


    //#endregion

    //#region[rgba(28, 155, 99, 0.1)]Setup
    this.enter = function () {            
        console.log("[DEBUG] ***ENTERING GAME STATE***");
        container = document.getElementById("container");
  
        if(mobileDevice) {
            console.log("[DEBUG] ***MOBILE DEVICE DETECTED***");
            canvas = createCanvas(ancho, alto);
            canvas.position(0, 0);
            canvas.parent(container);
            canvas.background(0);
        } else {
            canvas = createCanvas(ancho, alto);
            canvas.position(0,0);
            canvas.parent(container);
            canvas.background(0);
        }

        cameraOffset = width * 1 / 3;
        pointer = new Pointer(0, 0, 75, sphereAnimation); 
  
        canvas.background(0);

        window.setTimeout(this.startGame, 3000);
        interval = window.setInterval(this.timer, 1000);
    }
    //#endregion
   
    //#region[rgba(0, 0, 255, 0.1)]Draw
    this.draw = function () {

        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(backgroundAnimation[bgIndex], 0, 0, width, height);         

        //Mueve el canavas para crear un efecto de 'cámara'
     
        let playerIndex;
        if(gameStarted){
            playerIndex = Math.floor((pathY.length) * (nbAudioContext.currentTime() - timeOffSet) / nbAudioContext.getTrackDuration());   
        }else{
            playerIndex = 0;   
        }
        
        translate(-playerIndex * graphAmplitude + cameraOffset, 0);  

        //Colores de las lineas para crear un efecto de neón.            
        let colors = [
            [1, 15, 195, 200],
            [0, 239, 250, 255],
            [1, 15, 195, 200]
        ]

        //Límites del canvas en los que se va a dibujar la onda. Se dibuja solo la parte que se está ensenando
        let limite1 = Math.floor(playerIndex - cameraOffset);      
        let limite2 = Math.floor(playerIndex - cameraOffset + width);      
        
        
        //Se dibujan varias lineas de distinto color para crear el efecto neón
        for (let offset = (-colors.length - 1) * 0.5, j = 0; j < colors.length; offset++ , j++) {          

            stroke(colors[j]);
            strokeWeight(1)
            noFill();
            beginShape();

            //Solo se dibuja la linea dentro de la parte visible del canvas
            for (var i = limite1; i < limite2 ; i++) {
                if (i  < 0) {
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

        if(!gameStarted){
            playerSecond = 0;
        }
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
            if(playerSecond >= localMinimas[i].second - 4 && playerSecond <= localMinimas[i].second + 2){
                localMinimas[i].drawCircle(pointer.x, startDiameter, graphAmplitude);
                if(gameStarted){
                    localMinimas[i].successOrFail(graphAmplitude);
                }
                localMinimas[i].drawText(graphAmplitude);
                localMinimas[i].display(graphAmplitude,pointer.r);
            }
        }

        //Mueve el puntero del jugador     
        pointer.setPosition(playerIndex * graphAmplitude, pathY[playerIndex] - 10,mobileDevice);
        pointer.display(damageOverTime,mobileDevice);

        //Mira de qué color tiene que pintar al  jugador
        //pointer.actualIntervalo = this.getPlayerIntervalo();
        if(gameStarted){
            backgroundIndex++;
        }       
       

        this.checkEndGame();
        this.updateText();
        this.drawSongDuration();

        if(!gameStarted){
            fill(0, 150)
            rect(0 - cameraOffset, 0, width, height);

            fill(255, 200);
            textAlign(CENTER);
            textSize(150);
            textFont(p5.Font);
            text(countDown, -  cameraOffset + width * 0.5, height * 0.5)
        }
    }

    //#endregion

    //#region[rgba(155, 28, 99, 0.1)]Eventos
    this.keyPressed = function () {
        //Si pulsamos la tecla y todavía no hemos acertado ni fallado, se considera acierto
        if (keyCode === 32 && gameStarted) {
            this.handleInput(); // 32 = Barra espaciadora
        }
    }

    this.touchStarted = function () {
        if (mobileDevice && gameStarted){
            this.handleInput();
        }
    }

    this.handleInput = function () {
        clickSound.play();
        if (playerAtMinimum && !localMinimas[nextMinimum].success && !localMinimas[nextMinimum].fail ) { 
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
            if (combo%50 == 0){
                combo1Sound.play();
            }else if(combo%10 == 0){
                combo2Sound.play();
            }

        } else if (!playerAtMinimum && !localMinimas[nextMinimum].fail && nextMinimum + 1 < localMinimas.length) { //Si pulsamos la telca cuando no hemos llegado al mínimo, fallamos
            localMinimas[nextMinimum].success = false;
            this.playerLoseHp();
            localMinimas[nextMinimum].fail = true;
            combo = 1;
            //nextMinimum++;      
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
            nbAudioContext.stop();
            this.defeat();
        }
    }

    this.defeat = function(){
        canvas.remove();        
        mgr.showScene(DefeatState);
    }

    this.getPlayerSecond = function () {
        //Calculamos en qué segundo está el jugador 
        if(playerSecond <= songDuration){
            playerSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
            playerSecond = Math.round(playerSecond * 10) / 10 //Redondeamos un decimal
            endSecond = playerSecond;
        }else{
            endSecond = songDuration * pointer.x / ((pathY.length - 1) * graphAmplitude);
            endSecond = Math.round(endSecond * 10) / 10 //Redondeamos un decimal
        }
      
    }

    //Text
    this.updateText = function () {
        let animationY = height/11;
        let textY = height/9;
        let size =  height/3;
        let textS = height/18;
        //Points
        incrementPoints += 4;
        let index1 = Math.floor(indexPoints) % pointsAnimation.length;
        imageMode(CENTER);       
        image(pointsAnimation[index1], pointer.x + width/3, animationY, size, size);      
        indexPoints += 0.6; 

        fill(255, 255, 255);
        textAlign(LEFT);
        textFont(myFont[0]);
        textSize(textS);
        stroke('rgba(100%,0%,100%,0.0)');
        text(points,pointer.x + width * 0.42, textY);   

        //Combo
        incrementCombo += 4;
        let index = Math.floor(indexCombo) % comboAnimation.length;
        imageMode(CENTER);       
        image(comboAnimation[index], pointer.x - width/10,animationY, size, size);      
        indexCombo += 0.6;    

        fill(255, 255, 255);
        textAlign(LEFT);
        textSize(textS);
        stroke('rgba(100%,0%,100%,0.0)');
        text('X' + combo, (pointer.x - width/10) + (width * 0.1), textY);
    }

    this.checkEndGame = function () {
        if (endSecond > songDuration - fade) {
            alpha = lerp(0, 255, (endSecond - (songDuration - fade)) / (songDuration + 1-(songDuration - fade)));
            
            fill(0, 0, 0, alpha);
            ellipse(pointer.x, 0, 5000, 5000);
            if (endSecond > songDuration + 1) {
                mgr.showScene(EndGameState);
                maxCombo = maximumCombo;
                finalScore = points;
            }
        }
    }

    //Song duration
    this.drawSongDuration = function(){
        stroke(255,255,255);
        fill(255,255,255);
        let newWidth = ((2*width/3) * playerSecond) / songDuration;
        rect(pointer.x - width/5,height - height/9,newWidth,height/40);
    }
    //#endregion    

    this.startGame = function(){
        gameStarted = true;
        nbAudioContext.playTrackFromBeginning();
        timeOffSet = nbAudioContext.currentTime();
        clearInterval(interval);
    }

    this.timer = function(){
        if(!gameStarted){
            countDown--;
        }
    }   
    
    this.setSize = function(){
        if (!mobileDevice) {
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
        }else{            
            ancho = window.innerWidth;
            alto = window.innerHeight;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            canvas.background(0); 
        }
    }

    this.windowResized = function(){
         this.setSize();
    }
}

function resetGame(){
    canvas = null;
    fade = 2;
    flashBool = false;

    timeOffSet = null;
    pointer = null;
    
    cameraOffset = 0;

    backgroundIndex = 0;

    //Gameplay variables
    lowestScore = 100;
    midScore = 200;
    highestScore = 300;
    combo = 1;
    points = 0;
    maximumCombo = 1;
    damageOverTime = 0.1;
    hpFor100 = 3;
    hpFor200 = 5;
    hpFor300 = 7;
    hpForFail = -7.5;

    endSecond = 0;
    nextMinimum = 0;

    //Minimum circles  
    playerAtMinimum = false;   
    minimumSecondsRange = new Range(0, 0);
    playerSecond = 0;
    gameStarted = false;

    //Animaciones
    incrementCombo = 0;
    indexCombo = 0;
    incrementPoints = 0;
    indexPoints = 0;

    countDown = startDelay;
}

class Range {

    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

}

