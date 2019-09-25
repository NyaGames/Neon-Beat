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

class NeonBeatAudioContext{

    constructor(fft, sampleRate, callback, smoothing){
        fftSize = fft;
        samplerate = sampleRate;   
        
        onGraphCompleted = callback;
        smoothValue = smoothing;

    }

    decodeAudio(file){
        audioCtx = new AudioContext();                                   
        console.log("[GRAPH GENERATOR]Creating buffer..."); 
        audioCtx.decodeAudioData(file.target.result, this.processBuffer, function(err) { console.log(err);});
    }

    processBuffer(buffer){
        duration = buffer.duration;
        length = buffer.length;
        offlineCtx = new OfflineAudioContext(1, length, samplerate);

        processor = offlineCtx.createScriptProcessor(fftSize, 1, 1);
        processor.connect(offlineCtx.destination);

        analyser = offlineCtx.createAnalyser();
        analyser.fftSize = fftSize;    
        analyser.connect(processor);
        analyser.smoothingTimeConstant = smoothValue;

        offlineSource = offlineCtx.createBufferSource();    
        offlineSource.buffer = buffer;
        offlineSource.connect(analyser);

        source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);

        processor.onaudioprocess = NeonBeatAudioContext.prototype.processAudio;     

        console.log("[GRAPH GENERATOR]Starting...");

        offlineSource.start(0);    
        offlineCtx.startRendering();
    }

    processAudio(e){
        var data = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(data);
        NeonBeatAudioContext.prototype.freqToInt(data);
        let centroid = NeonBeatAudioContext.prototype.getCentroid(data);       
        fftHistory.push(centroid);

        if(fftHistory.length == Math.floor(length / fftSize))
            NeonBeatAudioContext.prototype.onEnd();
    }

    getCentroid(data){
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

    onEnd(){
        console.log('[GRAPH GENERATOR]Analysis Ended');
        onGraphCompleted(fftHistory);
    }

    freqToInt(data){
        if (data instanceof Uint8Array === false) {
            data = new Uint8Array(analyser.frequencyBinCount);
          }
    }

    getAudioContext(){return audioCtx;}
    playTrack(){source.start(0);}
    getTrackDuration(){return duration;}    
    currentTime(){return audioCtx.currentTime;}   
}