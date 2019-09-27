function GameState() {

    var canvas;
    var drawBool = false;
    var pathY = [];
    var localMinimas = [];
    var timeOffSet = null;
    var pointer = new Pointer(0, 0, 75, sphereAnimation);

    var graphAmplitude = 6;
    var input;
    var cameraOffset;

    var backgroundIndex = 0;

    this.enter = function () {
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, 0.9);

        console.log("[DEBUG] ***ENTERING GAME STATE***");
        canvas = createCanvas(1120, 630);
        input = createFileInput(handleFileSelect)
        input.position(8, height + 20);
        canvas.background(0);
        cameraOffset = width * 1 / 3;
    }

    this.songLoaded = function (fft) {
        let maxY = Math.max.apply(null, fft);
        console.log(maxY);
        for (let i = 0; i < fft.length; i++) {
            let y = map(fft[i], 0, maxY, height * 4 / 5, height * 1 / 5);           
            pathY.push(y);
        }

        //Buscamos mínimos locales
        let diff;
        let diffs = [5, 15, 20, 25, 30, 350, 600];    
        let intervals = [
            [0, 30], 
            [30, 60],
            [60, 240],
            [240, 630],
            [630, 2800], 
            [2800, 4300], 
            [4300, maxY]            
        ]
        for (let i = 1; i < fft.length - 1; i++) {

            let resta1 = fft[i] - fft[i - 1];
            let resta2 = fft[i] - fft[i + 1];

            let localMaxima;
            let localMinima;
            if (resta1 <= 0 && resta2 < 0) {
                //Mínimo local encontrado, ahora buscamos el máximo local más cercano
                localMinima = fft[i];

                //Buscamos el intervalo en el que se encunetra

                let interval;
                for (let i = 0; i < intervals.length; i++) {
                    if(localMinima >= intervals[i][0] && localMinima < intervals[i][1]){
                        interval = intervals[i]
                        diff = diffs[i];
                    }                    
                }

                for (let j = i; j < fft.length; j++) {
                    resta1 = fft[j] - fft[j - 1];
                    resta2 = fft[j] - fft[j + 1];

                    if (resta1 > 0 && resta2 > 0) {
                        localMaxima = fft[j];
                        break;
                    }

                }

                //localMinima = map(localMinima, 0, maxY, 0, diffs.length);
                if (Math.abs(localMinima - localMaxima) >= diff) {
                    localMinimas.push([i, pathY[i]]);
                }
            }
        }

        nbAudioContext.playTrack();
        drawBool = true;
    }


    this.draw = function () {

        canvas.background(0);

        //Animación del fondo
        let bgIndex = Math.floor(backgroundIndex % backgroundAnimation.length);
        imageMode(CORNER);
        image(backgroundAnimation[bgIndex], 0, 0, width, height);


        if (!drawBool) return;

        if (timeOffSet === null) {
            timeOffSet = nbAudioContext.currentTime();
        }

        //Mueve el canavas para crear un efecto de 'cámara'
        let playerIndex = Math.floor((pathY.length) * (nbAudioContext.currentTime() - timeOffSet) / nbAudioContext.getTrackDuration());
        translate(-playerIndex * graphAmplitude + cameraOffset, 0);


        //Dibuja varias lineas para crear un efecto de neón.            
        let colors = [
            /*[0, 0, 82, 50],
            [0, 2, 108, 100],
            [0, 0, 143, 100],
            [1, 15, 195, 150],
            [1, 15, 195, 150],
            [0, 239, 250, 200],
            [0, 239, 250, 255],
            [0, 239, 250, 200],
            [1, 15, 195, 150],
            [1, 15, 195, 150],
            [0, 0, 143, 100],
            [0, 2, 108, 100],
            [0, 0, 82, 50]*/

            [1, 15, 195, 200],
            [0, 239, 250, 255],
            [1, 15, 195, 200]
        ]

        //Límites del canvas en los que se va a dibujar la onda. Se dibuja solo la parte que se está enseñando
        let limite1 = Math.floor(playerIndex - cameraOffset);
        let tmp = 620 * width / 1120;
        let limite2 = Math.floor(limite1 + width) - tmp;

        for (let offset = (-colors.length - 1) * 0.5, j = 0; j < colors.length; offset++ , j++) {

            stroke(colors[j]);
            strokeWeight(1)
            noFill();
            beginShape();         
          
            for (var i = limite1; i < limite2; i++) {                
                if(i < 0)
                {
                    //Línea recta para la parte del canvas en la que la canción no ha empezado todavía
                    vertex(i, height * 4/5 + offset);                
                }
                else
                {
                    //Onda
                    vertex(i * graphAmplitude, pathY[i] + offset);         
                }
            }         


            endShape();
        }


        //Mínimos locales encontrados
        stroke(255, 0, 0);
        fill(255, 0, 0);
        for (let i = 0; i < localMinimas.length; i++) {
            ellipse(localMinimas[i][0] * graphAmplitude, localMinimas[i][1], 10, 10);
        }

        //Mueve el puntero del jugador     
        pointer.setPosition(playerIndex * graphAmplitude, pathY[playerIndex] - 10);
        pointer.display();
  

        backgroundIndex++;
    }
}

function handleFileSelect(evt) {
    var f = evt.file;

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