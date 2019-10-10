var mgr;
var nbAudioContext;
var img;
var flash;

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