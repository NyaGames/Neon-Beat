var audioCtx;
var offlineCtx;
var analyser;
var processAudio;
var offlineSource;
var source;
var processor;
var fftHistory = [];

var fftSize;
var samplerate;
var onGraphCompleted;
var duration;
var smoothValue;

class NeonBeatAudioContext {

    constructor(fft, sampleRate, callback, smoothing) {
        fftSize = fft;
        samplerate = sampleRate;

        onGraphCompleted = callback;
        smoothValue = smoothing;
    }

    decodeAudio(file) {
        //Recibe el archivo de audio cargado y crea el audio context
        audioCtx = new AudioContext();
        console.log("[GRAPH GENERATOR]Creating buffer...");
        //Mete el contenido del archivo en un buffer. Llama a processBuffer al terminar.
        audioCtx.decodeAudioData(file.target.result, this.processBuffer, function (err) { console.log(err); });
    }

    processBuffer(buffer) {
        duration = buffer.duration;
        length = buffer.length;

        //Crea el offlineCtx para poder utilizar el buffer fuera del tiempo de ejecución
        offlineCtx = new OfflineAudioContext(1, length, samplerate);

        //Creamos un script processor. Este será el encargado de llamar a una función en cada paso de tiempo de la canción.
        processor = offlineCtx.createScriptProcessor(fftSize, 1, 1);
        processor.connect(offlineCtx.destination);

        //Creamos el analizador. Este se encargará de sacar las frecuencias en un instante de tiempo.
        analyser = offlineCtx.createAnalyser();
        analyser.fftSize = fftSize;
        analyser.connect(processor);
        analyser.smoothingTimeConstant = smoothValue;

        //Creamos el buffer que va a analizar el analizador
        offlineSource = offlineCtx.createBufferSource();
        offlineSource.buffer = buffer;
        offlineSource.connect(analyser);

        //Creamos el buffer para que suene la canción a tiempo real
        source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);

        //Asignamos la función que se va a llamar en cada paso de tiempo de la canción
        processor.onaudioprocess = NeonBeatAudioContext.prototype.processAudio;  
        console.log("[GRAPH GENERATOR]Starting...");

        //Ponemos la canción desde el principio y empezamos a analizarla.
        offlineSource.start(0);
        offlineCtx.startRendering();
    }

    processAudio(e) {
        //Sacamos el espectro de frecuencias de un instante de la canción
        var data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        NeonBeatAudioContext.prototype.freqToInt(data);

        //Sacamos el centroide del espectro y lo metemos en el array
        let centroid = NeonBeatAudioContext.prototype.getCentroid(data);
        fftHistory.push(centroid);

        //Comprobamos si ya hemos analizado la canción.
        if (fftHistory.length == Math.floor(length / fftSize))
            NeonBeatAudioContext.prototype.onEnd();
    }

    getCentroid(data) {
        //Sacamos en centroide de un array. Es más o menos una media ponderada.
        var nyquist = offlineCtx.sampleRate / 2;
        var cumulative_sum = 0;
        var centroid_normalization = 0;
        for (var i = 0; i < data.length; i++) {
            cumulative_sum += i * data[i];
            centroid_normalization += data[i];
        }
        var mean_freq_index = 0;
        if (centroid_normalization !== 0) {
            mean_freq_index = cumulative_sum / centroid_normalization;
        }
        var spec_centroid_freq = mean_freq_index * (nyquist / data.length);
        return spec_centroid_freq;

    } 

    onEnd() {
        console.log('[GRAPH GENERATOR]Analysis Ended');
        onGraphCompleted(fftHistory,duration);
    }

    freqToInt(data) {
        if (data instanceof Uint8Array === false) {
            data = new Uint8Array(analyser.frequencyBinCount);
        }
    }

    getAudioContext() { return audioCtx; }
    playTrackFromBeginning() { source.start(0); }
    stop(){source.stop();}
    getTrackDuration() { return duration; }
    currentTime() { return audioCtx.currentTime; }
    changeSmoothing(smooth){smoothValue = smooth;}
}