var mgr;
var nbAudioContext;
var img;

var sphereAnimNumber = 60;
var backgroundNumber = 180;
var circleNumber = 30;
var successNumber = 16;
var successNumber2 = 16;
var successNumber3 = 16;
var failNumber = 16;
var failNumber2 = 16;
var failNumber3 = 16;
var lowestScoreNumber = 30;

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

var finalScore = 0;
var maxCombo = 0;

function preload(){    
  img = loadImage('assets/images/pelota.png');  
  for (let i = 0; i < sphereAnimNumber; i++) {
    if(i < 10){
        sphereAnimation.push(loadImage('assets/images/EsferaPrueba/0000' + i + '.png'));
    }else if(i < 100){
        sphereAnimation.push(loadImage('assets/images/EsferaPrueba/000' + i + '.png'));
    }else if(i < 1000){
        sphereAnimation.push(loadImage('assets/images/EsferaPrueba/00' + i + '.png'));
    }       
  }

  for (let i = 0; i < backgroundNumber; i++) {
    if(i < 10){
        backgroundAnimation.push(loadImage('assets/AfterEffect/NuevasParticulillas/0000' + i + '.png'));
    }else if(i < 100){
        backgroundAnimation.push(loadImage('assets/AfterEffect/NuevasParticulillas/000' + i + '.png'));
    }else if(i < 1000){
        backgroundAnimation.push(loadImage('assets/AfterEffect/NuevasParticulillas/00' + i + '.png'));
    } 
  }

  for (let i = 0; i < circleNumber; i++) {
    if(i < 10){
        circleAnimation.push(loadImage('assets/AfterEffect/Circunferencia/0000' + i + '.png'));
    }else if(i < 100){
        circleAnimation.push(loadImage('assets/AfterEffect/Circunferencia/000' + i + '.png'));
    }else if(i < 1000){
        circleAnimation.push(loadImage('assets/AfterEffect/Circunferencia/00' + i + '.png'));
    } 
  }

  //Animaciones de ACIERTO
  for (let i = 0; i < successNumber; i++) {
    if(i < 10){
        successAnimation.push(loadImage('assets/AfterEffect/Acierto/0000' + i + '.png'));
    }else if(i < 100){
        successAnimation.push(loadImage('assets/AfterEffect/Acierto/000' + i + '.png'));
    }else if(i < 1000){
        successAnimation.push(loadImage('assets/AfterEffect/Acierto/00' + i + '.png'));
    } 
  }

  for (let i = 0; i < successNumber2; i++) {
    if(i < 10){
        successAnimation2.push(loadImage('assets/AfterEffect/Acierto2/0000' + i + '.png'));
    }else if(i < 100){
        successAnimation2.push(loadImage('assets/AfterEffect/Acierto2/000' + i + '.png'));
    }else if(i < 1000){
        successAnimation2.push(loadImage('assets/AfterEffect/Acierto2/00' + i + '.png'));
    } 
  }

  for (let i = 0; i < successNumber3; i++) {
    if(i < 10){
        successAnimation3.push(loadImage('assets/AfterEffect/Acierto3/0000' + i + '.png'));
    }else if(i < 100){
        successAnimation3.push(loadImage('assets/AfterEffect/Acierto3/000' + i + '.png'));
    }else if(i < 1000){
        successAnimation3.push(loadImage('assets/AfterEffect/Acierto3/00' + i + '.png'));
    } 
  }


  // Animaciones de FALLO
  for (let i = 0; i < failNumber; i++) {
    if(i < 10){
        failAnimation.push(loadImage('assets/AfterEffect/fallo/0000' + i + '.png'));
    }else if(i < 100){
        failAnimation.push(loadImage('assets/AfterEffect/fallo/000' + i + '.png'));
    }else if(i < 1000){
        failAnimation.push(loadImage('assets/AfterEffect/fallo/00' + i + '.png'));
    } 
  }

  for (let i = 0; i < failNumber2; i++) {
    if(i < 10){
        failAnimation2.push(loadImage('assets/AfterEffect/fallo2/0000' + i + '.png'));
    }else if(i < 100){
        failAnimation2.push(loadImage('assets/AfterEffect/fallo2/000' + i + '.png'));
    }else if(i < 1000){
        failAnimation2.push(loadImage('assets/AfterEffect/fallo2/00' + i + '.png'));
    } 
   }

  for (let i = 0; i < failNumber3; i++) {
    if(i < 10){
        failAnimation3.push(loadImage('assets/AfterEffect/fallo3/0000' + i + '.png'));
    }else if(i < 100){
        failAnimation3.push(loadImage('assets/AfterEffect/fallo3/000' + i + '.png'));
    }else if(i < 1000){
        failAnimation3.push(loadImage('assets/AfterEffect/fallo3/00' + i + '.png'));
    } 
    }

    //Animaciones de puntuaciones
    for (let i = 0; i < lowestScoreNumber; i++) {
        if(i < 10){
            lowestScoreAnimation.push(loadImage('assets/AfterEffect/100/0000' + i + '.png'));
        }else if(i < 100){
            lowestScoreAnimation.push(loadImage('assets/AfterEffect/100/000' + i + '.png'));
        }else if(i < 1000){
            lowestScoreAnimation.push(loadImage('assets/AfterEffect/100/00' + i + '.png'));
        } 
    }

}

function setup(){
    createCanvas(600, 500);

    angleMode(DEGREES);

    mgr = new SceneManager();

    mgr.addScene(BootState);
    mgr.addScene(PreloadState); 
    mgr.addScene(MainMenuState); 
    mgr.addScene(CreditsState); 
    mgr.addScene(SongSelectionState);
    mgr.addScene(GameState); 
    mgr.addScene(EndGameState); 

    mgr.showNextScene();    

    
}

function draw(){
    mgr.draw();
}

function touchStarted(){
    mgr.handleEvent("touchStarted");
}

function mousePressed(){
    mgr.handleEvent("mousePressed");
}

function keyPressed(){
    mgr.handleEvent("keyPressed");
}