var chosenDifficulty;
var songFile;

var selectionButton;

    var easyButton;
    var easyImage;
    var normalButton;
    var normalImage;
    var hardButton;
    var hardImage;

    var twilight_button;
    var twilight_encendido_img;
    var twilight_apagado_img;
    var lsd_button;
    var lsd_encendido_img;
    var lsd_apagado_img;
    var orange_button;
    var orange_encendido_img;
    var orange_apagado_img;

    var selectionImage;  


function SongSelectionState(){    
        
    var container;
    var canvas;

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
        selectionButton.id("inputfile");
        selectionButton.parent(container);
        selectionButton.position(0*wPercentaje, 250*hPercentaje);
        selectionImage = createImg('assets/images/PantallaVictoria/caja_cancion.png');
        selectionImage.parent(selectionButton);
        selectionImage.size(584*wPercentaje, 278*hPercentaje);
        state = 0;

        //canciones ya metidas
        twilight_button = createDiv();
        twilight_button.parent(container);
        twilight_button.mousePressed(this.loadSong1); 
        twilight_button.position((1120-824)*wPercentaje, 250*hPercentaje);
        twilight_encendido_img = createImg('assets/images/seleccionCancion/twilight_encendido.png');
        twilight_encendido_img.size(824*wPercentaje, 205*hPercentaje);
        twilight_encendido_img.parent(twilight_button);

        lsd_button = createDiv();
        lsd_button.parent(container);
        lsd_button.mousePressed(this.loadSong2); 
        lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
        lsd_apagado_img = createImg('assets/images/seleccionCancion/lsd_apagado.png');
        lsd_apagado_img.size(661*wPercentaje, 203*hPercentaje);
        lsd_apagado_img.parent(lsd_button);

        orange_button = createDiv();
        orange_button.parent(container);
        orange_button.mousePressed(this.loadSong3); 
        orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
        orange_apagado_img = createImg('assets/images/seleccionCancion/orange_apagado.png');
        orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
        orange_apagado_img.parent(orange_button);


        chosenDifficulty = difficulties.normal; 

        //crear botones de dificultad
        easyButton = createDiv();
        easyButton.parent(container);
        easyButton.mousePressed(this.setEasyMode);
        easyButton.position(0 *wPercentaje, 300*hPercentaje);
        easyImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        easyImage.size(61 * wPercentaje, 60*hPercentaje);
        easyImage.parent(easyButton);

        normalButton = createDiv();
        normalButton.parent(container);
        normalButton.mousePressed(this.setNormalMode);
        normalButton.position(80*wPercentaje, 300*hPercentaje);
        normalImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        normalImage.size(61 * wPercentaje, 60*hPercentaje);
        normalImage.parent(normalButton);

        hardButton = createDiv();
        hardButton.parent(container);
        hardButton.mousePressed(this.setHardMode);
        hardButton.position(160*wPercentaje, 300*hPercentaje);
        hardImage = createImg('assets/images/seleccionCancion/estrella apagada.png');
        hardImage.size(61 * wPercentaje, 60*hPercentaje);
        hardImage.parent(hardButton);
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
                songFile = file;
                canvas.remove();
                selectionButton.remove();
                cancion_menu.sound.stop();
                mgr.showScene(PreloadState);
            }
            reader.readAsArrayBuffer(f);
        } else {
            throw("No good file");
        }    
    }

    this.setEasyMode = function(){
        easyImage.remove();
        easyImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        easyImage.size(61 * wPercentaje, 60*hPercentaje);
        easyImage.parent(easyButton);
        normalImage.remove();
        normalImage = createImg('assets/images/seleccionCancion/estrella apagada.png');
        normalImage.size(61 * wPercentaje, 60*hPercentaje);
        normalImage.parent(normalButton);
        hardImage.remove();
        hardImage = createImg('assets/images/seleccionCancion/estrella apagada.png');
        hardImage.size(61 * wPercentaje, 60*hPercentaje);
        hardImage.parent(hardButton);
        chosenDifficulty = difficulties.easy; 
    }
    this.setNormalMode = function(){
        easyImage.remove();
        easyImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        easyImage.size(61 * wPercentaje, 60*hPercentaje);
        easyImage.parent(easyButton);
        normalImage.remove();
        normalImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        normalImage.size(61 * wPercentaje, 60*hPercentaje);
        normalImage.parent(normalButton);
        hardImage.remove();
        hardImage = createImg('assets/images/seleccionCancion/estrella apagada.png');
        hardImage.size(61 * wPercentaje, 60*hPercentaje);
        hardImage.parent(hardButton);
        chosenDifficulty = difficulties.normal; 
    }
    this.setHardMode = function(){
        easyImage.remove();
        easyImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        easyImage.size(61 * wPercentaje, 60*hPercentaje);
        easyImage.parent(easyButton);
        normalImage.remove();
        normalImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        normalImage.size(61 * wPercentaje, 60*hPercentaje);
        normalImage.parent(normalButton);
        hardImage.remove();
        hardImage = createImg('assets/images/seleccionCancion/estrella_encendida.png');
        hardImage.size(61 * wPercentaje, 60*hPercentaje);
        hardImage.parent(hardButton);
        chosenDifficulty = difficulties.difficult; 
    }

    this.setSize = function(){
        if (!mobileDevice) {
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
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
    
   

    //De Pablo para Jusi: Con todo el amor del mundo
    this.loadSong1 = function(){
        if(state === 0){
            loadSongFromURL("assets/ost/Kate_Orange_-_Twilight__instrumental_.mp3");
        }else{
            if(state === 1){
                lsd_encendido_img.remove();
                twilight_apagado_img.remove();

                twilight_button.position((1120-824)*wPercentaje, 250*hPercentaje);
                twilight_encendido_img = createImg('assets/images/seleccionCancion/twilight_encendido.png');
                twilight_encendido_img.size(824*wPercentaje, 205*hPercentaje);
                twilight_encendido_img.parent(twilight_button);
    
                lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
                lsd_apagado_img = createImg('assets/images/seleccionCancion/lsd_apagado.png');
                lsd_apagado_img.size(661*wPercentaje, 203*hPercentaje);
                lsd_apagado_img.parent(lsd_button);
            }else{
                orange_encendido_img.remove();
                twilight_apagado_img.remove();

                twilight_button.position((1120-824)*wPercentaje, 250*hPercentaje);
                twilight_encendido_img = createImg('assets/images/seleccionCancion/twilight_encendido.png');
                twilight_encendido_img.size(824*wPercentaje, 205*hPercentaje);
                twilight_encendido_img.parent(twilight_button);
    
                orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
                orange_apagado_img = createImg('assets/images/seleccionCancion/orange_apagado.png');
                orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
                orange_apagado_img.parent(orange_button);
            }
            state = 0;
        }
    }

    this.loadSong2 = function(){
        if(state === 1){
            loadSongFromURL("assets/ost/Kate_Orange_-_LSD__instrumental_.mp3");
        }else{
            if(state === 0){
                twilight_encendido_img.remove();
                lsd_apagado_img.remove();
                
                twilight_button.position((1120-661)*wPercentaje, 250*hPercentaje);
                twilight_apagado_img = createImg('assets/images/seleccionCancion/twilight_apagado.png');
                twilight_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                twilight_apagado_img.parent(twilight_button);
    
                lsd_button.position((1120-824)*wPercentaje, 60*hPercentaje);
                lsd_encendido_img = createImg('assets/images/seleccionCancion/lsd_encendido.png');
                lsd_encendido_img.size(824*wPercentaje, 203*hPercentaje);
                lsd_encendido_img.parent(lsd_button);
            }else{
                lsd_apagado_img.remove();
                orange_encendido_img.remove();

                lsd_button.position((1120-824)*wPercentaje, 60*hPercentaje);
                lsd_encendido_img = createImg('assets/images/seleccionCancion/lsd_encendido.png');
                lsd_encendido_img.size(824*wPercentaje, 203*hPercentaje);
                lsd_encendido_img.parent(lsd_button);
        
                orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
                orange_apagado_img = createImg('assets/images/seleccionCancion/orange_apagado.png');
                orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
                orange_apagado_img.parent(orange_button);                
            }
            state = 1;
        }
    }

    this.loadSong3 = function(){
        if(state === 2){
            loadSongFromURL("assets/ost/Kate_Orange_-_Stereo_radio.mp3");
        }else{
            if(state === 0){
                twilight_encendido_img.remove();
                orange_apagado_img.remove();

                twilight_button.position((1120-661)*wPercentaje, 250*hPercentaje);
                twilight_apagado_img = createImg('assets/images/seleccionCancion/twilight_apagado.png');
                twilight_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                twilight_apagado_img.parent(twilight_button);
        
                orange_button.position((1120-824)*wPercentaje, 440*hPercentaje);
                orange_encendido_img = createImg('assets/images/seleccionCancion/orange_encendido.png');
                orange_encendido_img.size(824*wPercentaje, 203*hPercentaje);
                orange_encendido_img.parent(orange_button);
            }else{
                lsd_encendido_img.remove();
                orange_apagado_img.remove();
    
                lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
                lsd_apagado_img = createImg('assets/images/seleccionCancion/lsd_apagado.png');
                lsd_apagado_img.size(661*wPercentaje, 203*hPercentaje);
                lsd_apagado_img.parent(lsd_button);
        
                orange_button.position((1120-824)*wPercentaje, 440*hPercentaje);
                orange_encendido_img = createImg('assets/images/seleccionCancion/orange_encendido.png');
                orange_encendido_img.size(824*wPercentaje, 203*hPercentaje);
                orange_encendido_img.parent(orange_button);
            }
            state = 2;
        }
    }    
    
    this.setSize = function(){
        if (!mobileDevice) {
            ancho = window.innerWidth - window.innerWidth*0.208*2;   
            alto = window.innerHeight - window.innerHeight*0.163*2;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            background(0);
            
            if(state === 0){
                twilight_button.position((1120-824)*wPercentaje, 250*hPercentaje);
                twilight_encendido_img.size(824*wPercentaje, 205*hPercentaje);
                lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
                lsd_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
                orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
            }else if(state === 1){
                twilight_button.position((1120-661)*wPercentaje, 250*hPercentaje);
                twilight_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                lsd_button.position((1120-824)*wPercentaje, 60*hPercentaje);
                lsd_encendido_img.size(824*wPercentaje, 205*hPercentaje);
                orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
                orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
            }else if(state === 2){                
                twilight_button.position((1120-661)*wPercentaje, 250*hPercentaje);
                twilight_encendido_img.size(661*wPercentaje, 205*hPercentaje);
                lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
                lsd_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                orange_button.position((1120-824)*wPercentaje, 440*hPercentaje);
                orange_encendido_img.size(824*wPercentaje, 203*hPercentaje);
            }
        }else{            
            ancho = window.innerWidth;
            alto = window.innerHeight;
            wPercentaje = ancho/1120;
            hPercentaje = alto/630;
            resizeCanvas(ancho, alto);
            canvas.background(0);           
            
            if(state === 0){
                twilight_button.position((1120-824)*wPercentaje, 250*hPercentaje);
                twilight_encendido_img.size(824*wPercentaje, 205*hPercentaje);
                lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
                twilight_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
                orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
            }else if(state === 1){
                twilight_button.position((1120-661)*wPercentaje, 250*hPercentaje);
                twilight_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                lsd_button.position((1120-824)*wPercentaje, 60*hPercentaje);
                twilight_encendido_img.size(824*wPercentaje, 205*hPercentaje);
                orange_button.position((1120-661)*wPercentaje, 440*hPercentaje);
                orange_apagado_img.size(661*wPercentaje, 203*hPercentaje);
            }else{                
                twilight_button.position((1120-661)*wPercentaje, 250*hPercentaje);
                twilight_encendido_img.size(661*wPercentaje, 205*hPercentaje);
                lsd_button.position((1120-661)*wPercentaje, 60*hPercentaje);
                twilight_apagado_img.size(661*wPercentaje, 205*hPercentaje);
                orange_button.position((1120-824)*wPercentaje, 440*hPercentaje);
                orange_encendido_img.size(824*wPercentaje, 203*hPercentaje);
            }
        }
    }

    this.windowResized = function(){
         this.setSize();
    }
}

function loadSongFromURL(url){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'blob';
    request.onload = function() {
        var reader = new FileReader();
        reader.readAsArrayBuffer(request.response);
        reader.onload =  function(file){
            songFile = file;
            cancion_menu.sound.stop();
            if(canvas !== null){
                canvas.remove();
                selectionButton.remove();
                twilight_button.remove();
                lsd_button.remove();
                orange_button.remove();
                easyButton.remove();
                normalButton.remove();
            };
            hardButton.remove();
            mgr.showScene(PreloadState);
        };
    };
    request.send(); 
}