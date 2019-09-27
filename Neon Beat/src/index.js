var mgr;
var nbAudioContext;
var img;

var sphereAnimNumber = 60;
var backgroundNumber = 180;

var sphereAnimation = [];
var backgroundAnimation = [];

function preload(){    
  img = loadImage('assets/images/pelota.png');  
  for (let i = 0; i < sphereAnimNumber; i++) {
    if(i < 10){
        sphereAnimation.push(loadImage('assets/images/EsferaPequeñisima/0000' + i + '.png'));
    }else if(i < 100){
        sphereAnimation.push(loadImage('assets/images/EsferaPequeñisima/000' + i + '.png'));
    }else if(i < 1000){
        sphereAnimation.push(loadImage('assets/images/EsferaPequeñisima/00' + i + '.png'));
    } 
      
  }

  for (let i = 0; i < backgroundNumber; i++) {
    if(i < 10){
        backgroundAnimation.push(loadImage('assets/images/Particulillas/Twirst_0000' + i + '.png'));
    }else if(i < 100){
        backgroundAnimation.push(loadImage('assets/images/Particulillas/Twirst_000' + i + '.png'));
    }else if(i < 1000){
        backgroundAnimation.push(loadImage('assets/images/Particulillas/Twirst_00' + i + '.png'));
    } 
  }
}

function setup(){
    createCanvas(600, 500);

    mgr = new SceneManager();

    mgr.addScene(BootState);
    mgr.addScene(PreloadState); 
    mgr.addScene(MainMenuState); 
    mgr.addScene(GameState); 
    mgr.addScene(EndGameState); 

    mgr.showNextScene();    
}

function draw(){
    mgr.draw();
}

function mousePressed(){
    mgr.handleEvent("mousePressed");
}

function keyPressed(){
    mgr.handleEvent("keyPressed");
}