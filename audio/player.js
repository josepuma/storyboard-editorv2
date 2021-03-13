import {Howl, Howler} from 'howler';
let lastAudio

export class Player {
    constructor(path){
        this.path = path
        this.duration = 0
    }
    playAudio(){
        this.stopAudio()
        let sound = new Howl({
            src: this.path
        })

        //-sound.seek(105)
        //sound.once('load', function(){
            sound.play()
            lastAudio = sound
        //});
        //sound.play()
        
    }
    getPosition(){
        if(lastAudio){
            return Math.round(lastAudio.seek() * 1000)
        }
    }

    getDuration(){
        if(lastAudio){
            return Math.round(lastAudio.duration() * 1000)
        }
    }

    setPosition(position){
        if(lastAudio){
            lastAudio.seek(position / 1000)
        }
    }

    getFFt(){
        var analyser = Howler.ctx.createAnalyser();
        Howler.masterGain.connect(analyser);
        analyser.connect(Howler.ctx.destination);
        analyser.fftSize = 1024;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);
        return analyser.getByteTimeDomainData(dataArray);

    }

    stopAudio(){
        if(lastAudio){
            lastAudio.stop()
        }
    }
}
