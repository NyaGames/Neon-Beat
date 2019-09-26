function GameState() {

    var canvas;
    var drawBool = false;
    var pathY = [];
    var localMinimas = [];
    var timeOffSet = null;
    var pointer = new Pointer(0, 0, 75, sphereAnimation);

    var graphAmplitude = 4;
    var input;
    var cameraOffset = 100;

    var backgroundIndex = 0;

    this.enter = function () {
        nbAudioContext = new NeonBeatAudioContext(1024, 48000, this.songLoaded, 0.9);

        console.log("[DEBUG] ***ENTERING GAME STATE***");
        canvas = createCanvas(1120, 630);
        input = createFileInput(handleFileSelect)
        input.position(8, height + 20);
        canvas.background(0)
    }

    this.songLoaded = function (fft) {
        let maxY = Math.max.apply(null, fft);
        for (let i = 0; i < fft.length; i++) {
            let y = map(fft[i], 0, maxY, height * 4 / 5, height * 1 / 5);
            pathY.push(y);
        }

        let diff = 50;
        for (let i = 1; i < fft.length - 1; i++) {
            //Buscamos mínimos locales
            let resta1 = fft[i] - fft[i - 1];
            let resta2 = fft[i] - fft[i + 1];

            let localMaxima;
            let localMinima;
            if (resta1 <= 0 && resta2 < 0) {
                //Mínimo local encontrado, ahora buscamos el máximo local más cercano
                localMinima = fft[i];
                for (let j = i; j < fft.length; j++) {
                    resta1 = fft[j] - fft[j - 1];
                    resta2 = fft[j] - fft[j + 1];

                    if (resta1 > 0 && resta2 > 0) {
                        localMaxima = fft[j];
                        break;
                    }

                }

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

        //Mueve el puntero del jugador     
        pointer.setPosition(playerIndex * graphAmplitude, pathY[playerIndex] - 10);
        pointer.display();

        //Dibuja varias lineas para crear un efecto de blur.            
        let colors = [
            [0, 0, 82, 50],
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
            [0, 0, 82, 50]
        ]

        for (let offset = (-colors.length - 1) * 0.5 , j = 0; j < colors.length; offset++, j++) {   

            stroke(colors[j]);
            strokeWeight(1)
            noFill();
            beginShape();

            for (let i = playerIndex - cameraOffset; i < width + playerIndex - cameraOffset; i++) {
                vertex(i * graphAmplitude, pathY[i] + offset);
            }

            endShape();
        }

        stroke(255, 0, 0);
        fill(255, 0, 0);
        for (let i = 0; i < localMinimas.length; i++) {
            ellipse(localMinimas[i][0] * graphAmplitude, localMinimas[i][1], 10, 10);
        }

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