var mgr;
var nbAudioContext;
var img;
var flash;

/*var sphereAnimNumber = 60;
var backgroundNumber = 180;
var circleNumber = 30;
var successNumber = 16;
var successNumber2 = 16;
var successNumber3 = 16;
var failNumber = 16;
var failNumber2 = 16;
var failNumber3 = 16;
var lowestScoreNumber = 30;
var midScoreNumber = 30;
var highestScoreNumber = 30;

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
var highestScoreAnimation = [];*/

var finalScore = 0;
var maxCombo = 0;

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