var chosenDifficulty;
var songFile;

function SongSelectionState(){    
        
    var container;
    var canvas;

    var selectionButton;

    var easyButton;
    var normalButton;
    var hardButton;

    var selectionImage;  

    var songSelectionBGIndex = 0;

    var difficulties = {
        easy:{
            graphAmplitude: 4,
            secondsFromMinimun: 0.5,
            waveSmoothing: 0.95,
            diffs: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            minDistance: 10,
        },
        normal: {
            graphAmplitude: 6,
            secondsFromMinimun: 1,
            waveSmoothing: 0.9,
            diffs: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            minDistance: 10,
        },
        difficult: {
            graphAmplitude: 8,
            secondsFromMinimun: 0.1,
            waveSmoothing: 0.6,
            diffs: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            minDistance: 10,
        }
    }

    this.enter = function()
    {
        console.log("[DEBUG] ***ENTERING SONG SELECTION STATE***")
       
        //cargar imagenes
        container = createDiv();
        container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);

        //crear imagenes
        canvas = createCanvas(1120, 630);
        canvas.parent(container);
        canvas.background(0);
        
        //crear boton de seleccion        
        selectionButton = createFileInput(this.handleFileSelect);
        selectionButton.parent(container);
        selectionButton.position(0, 250);
        selectionButton.size(584, 278);
        selectionImage = createImg('assets/images/PantallaVictoria/caja_cancion.png');
        selectionImage.parent(selectionButton);
        state = 0;

        chosenDifficulty = difficulties.normal;

        //crear botones de dificultad
        /*easyButton = createDiv();
        easyButton.parent(container);
        easyButton.position(0, 0);
        selectionImage = createImg('assets/images/seleccionCancion/tarjeta.png');
        selectionImage.parent(selectionButton);*/

    }  

    this.draw = function()
    {
        background(0);

        //Animación del fondo
        let bgIndex = Math.floor(songSelectionBGIndex % menuBackground.length);
        imageMode(CORNER);
        image(menuBackground[bgIndex], 0, 0, width, height);

        songSelectionBGIndex++;
        
    }

    this.handleFileSelect = function(evt) {
        var f = evt.file;           
        //Cargar el archivo    
        if (f.type === "audio/aiff" || true) {
            var reader = new FileReader();
            reader.onload = function (file) {
                //nbAudioContext.decodeAudio(file);
                songFile = file;
                selectionButton.remove();
                mgr.showScene(PreloadState);
            }
            reader.readAsArrayBuffer(f);
        } else {
            throw("No good file");
        }    
    }
}