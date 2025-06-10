import './appBar.css';
import githubIcon from './../assets/github-mark-white.svg';
import volumeUpIcon from './../assets/volume_up.svg';
import volumeOffIcon from './../assets/volume_off.svg';
import { useEffect, useState } from 'react';
import audioPLayer from '../common/audioPlayer';

export const AppBar = () => {
	const [isMute, setIsMute] = useState(false);

	useEffect(() => {
		const isMute = localStorage.getItem("sound") === "off";
		setIsMute(isMute);
		audioPLayer.setVolume(isMute ? 0 : 1);
	}, []);

	const onSoundButtonClick = () => {
		setIsMute(!isMute);
		audioPLayer.setVolume(!isMute ? 0 : 1);
		localStorage.setItem("sound", !isMute ? "off" : "on");
	};

	return (
		<div className='appBar-container'>
			<div>
				<a href="https://github.com/regg408/roulette">
					<img className="round" src={githubIcon} alt="github" />
				</a>
			</div>

			<div className="appBar-right-side-container">
				<button onClick={onSoundButtonClick}>
					{
						isMute ?
							<img src={volumeOffIcon} alt="volumeOff" /> :
							<img src={volumeUpIcon} alt="volumeUp" />
					}
				</button>
				<h3 style={{ color: "gray" }}>v{__PACKAGE_JSON_VERSION__}</h3>

			</div>
		</div>
	);
};