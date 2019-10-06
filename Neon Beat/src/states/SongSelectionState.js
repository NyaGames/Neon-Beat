function SongSelectionState(){    
        
    var container;
    var canvas;
    var backgroundIndex = 0;

    var state;

    var selectionButton;

    var easyButton;
    var normalButton;
    var hardButton;

    var selectionImage;

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
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(backgroundAnimation[bgIndex], 0, 0, width, height);

        backgroundIndex++;
        
    }

    this.handleFileSelect = function(evt) {
        var f = evt.file;   
        secondsFromMinimun = chosenDifficulty.secondsFromMinimun;
        graphAmplitude = chosenDifficulty.graphAmplitude;    
        nbAudioContext.changeSmoothing(chosenDifficulty.waveSmoothing)
        //Cargar el archivo    
        if (f.type === "audio/aiff" || true) {
            var reader = new FileReader();
            reader.onload = function (file) {
                nbAudioContext.decodeAudio(file);
            }
            reader.readAsArrayBuffer(f);
        } else {
            trow("No good file");
        }    
    }
}