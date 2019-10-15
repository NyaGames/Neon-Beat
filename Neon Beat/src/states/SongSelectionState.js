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
            secondsFromMinimun: 0.3,
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
        container = document.getElementById("container");

        //crear imagenes
        canvas = createCanvas(ancho, alto);
        canvas.parent(container);
        canvas.background(0);
        
        //crear boton de seleccion        
        selectionButton = createFileInput(this.handleFileSelect);
        selectionButton.parent(container);
        selectionButton.position(0*wPercentaje, 250*hPercentaje);
        selectionImage = createImg('assets/images/PantallaVictoria/caja_cancion.png');
        selectionButton.position(0, 0);
        selectionImage.parent(selectionButton);
        selectionImage.size(584*wPercentaje, 278*hPercentaje);
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
        image(menuBackground[bgIndex], 0, 0, ancho, alto);

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
                canvas.remove();
                selectionButton.remove();
                cancion_menu.stop();
                mgr.showScene(PreloadState);
            }
            reader.readAsArrayBuffer(f);
        } else {
            throw("No good file");
        }    
    }

    this.setSize = function(){
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            container.position(window.outerWidth * 0.205, window.outerHeight * 0.165);
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
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