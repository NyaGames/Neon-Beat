var mgr;
var nbAudioContext;
var img;

var sphereAnimNumber = 60;
var backgroundNumber = 180;
var circleNumber = 30;
var successNumber = 16;
var failNumber = 16;

var sphereAnimation = [];
var backgroundAnimation = [];
var circleAnimation = [];
var successAnimation = [];
var failAnimation = [];

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

  for (let i = 0; i < successNumber; i++) {
    if(i < 10){
        successAnimation.push(loadImage('assets/AfterEffect/Acierto/0000' + i + '.png'));
    }else if(i < 100){
        successAnimation.push(loadImage('assets/AfterEffect/Acierto/000' + i + '.png'));
    }else if(i < 1000){
        successAnimation.push(loadImage('assets/AfterEffect/Acierto/00' + i + '.png'));
    } 
  }

  for (let i = 0; i < failNumber; i++) {
    if(i < 10){
        failAnimation.push(loadImage('assets/AfterEffect/fallo/0000' + i + '.png'));
    }else if(i < 100){
        failAnimation.push(loadImage('assets/AfterEffect/fallo/000' + i + '.png'));
    }else if(i < 1000){
        failAnimation.push(loadImage('assets/AfterEffect/fallo/00' + i + '.png'));
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