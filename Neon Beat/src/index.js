var mgr;
var nbAudioContext;
var img;
var flash;

var finalScore = 0;
var maxCombo = 0;

var mobileDevice = false;

function setup(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        mobileDevice = true;
    }else{
        mobileDevice = false;
    }

    FBInstant.initializeAsync()
    .then(function(){
        FBInstant.setLoadingProgress(100);
    }
    );
    
    FBInstant.startGameAsync().then(function() {
    game.start();
    });
    
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

function mouseClicked(){
    mgr.handleEvent("mouseClicked");
}

function mousePressed(){
    mgr.handleEvent("mousePressed");
}

function keyPressed(){
    mgr.handleEvent("keyPressed");
}

function windowResized(){
    mgr.handleEvent("windowResized");
}

//Hello world
