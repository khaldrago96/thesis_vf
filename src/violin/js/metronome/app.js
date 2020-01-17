/* eslint-disable prettier/prettier */
class MetronomeApp {
    /**
     * Creates a MetronomeApp.
    //  * @param soundsPath the path used to fetch the sound files
    //  * @param sounds an array of sound file names
    //  * @param visSettings settings for the visualizer
     */
    constructor(
        soundsPath,
        sounds,
        visSettings,
    ) {
        this.visSettings = visSettings;
        const metroSoundListener = {
            setTempo: t => (visSettings.tempoBpm = t),
            setStartTime: t => (visSettings.startTime = t)
        };
        this.metroSound = new MetronomeSound(
            soundsPath,
            sounds,
            metroSoundListener
        );

        visSettings.getTime = () => this.metroSound.audioContext.currentTime;
    }

    /**
     * Sets the tempo.
     * @param bpm tempo in beats per minute
     */

    setTempo(bpm) {
        this.metroSound.setTempo(bpm);
    }

    /** Starts the metronome if it is stopped, and vice versa. */
    toggle() {
        this.metroSound.toggle();
    }
}

const metronomeApp = new MetronomeApp(
    "assets/audio/",
    [
        "metronome.wav",
    ],
    VisSettings
);
