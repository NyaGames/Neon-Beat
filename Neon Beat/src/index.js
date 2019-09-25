var mgr;
var nbAudioContext;
var img;

function preload(){    
  img = loadImage('assets/pelota.png');  
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

    document.getElementById('files').addEventListener('change', handleFileSelect, false);
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

function handleFileSelect(evt) {
    var files = evt.target.files;
  
    //Cargar el archivo
    for (var i = 0, f; f = files[i]; i++) {    
      if (f.type === "audio/aiff" || true) {
        var reader = new FileReader();
        reader.onload = function(file){
            nbAudioContext.decodeAudio(file);
        }
        reader.readAsArrayBuffer(f);
      } else {
        trow("No good file");
      }
    }
  }