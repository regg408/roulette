import rollAudio from "./../assets/unwelcome-school-made-with-Voicemod.mp3";
import resultAudio from "./../assets/mixkit-retro-game-notification-212.wav";

class AudioPLayer {
	#RollAudio: HTMLAudioElement = new Audio(rollAudio);
	#ResultAudio: HTMLAudioElement = new Audio(resultAudio);

	playResultAudio() {
		this.#ResultAudio.play();
	}

	playRollAudio() {
		this.#RollAudio.play();
	}

	stopRollAudio() {
		this.#RollAudio.pause();
		this.#RollAudio.currentTime = 0;
	}

	setVolume(volume: number) {
		this.#RollAudio.volume = volume;
		this.#ResultAudio.volume = volume;
	}
}

const audioPLayer = new AudioPLayer();

export default audioPLayer;