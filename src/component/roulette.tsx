import { RefObject, useRef, useState } from 'react';
import './roulette.css';
import { getRandomEasing } from '../common/easing';

interface RouletteProps {
	degreeRef: RefObject<number>;
	list: string[];
	onStop: () => void;
}

/**
 * 輪盤元件，使用背景畫出分割後的輪盤
 * @param props 
 * @returns 
 */
export const Roulette = (props: RouletteProps) => {
	const { degreeRef, list, onStop } = props;

	const [isSpin, setIsSpin] = useState(false);
	const [degree, setDegree] = useState(degreeRef.current);

	const speedFactor = useRef<number>(0);
	const weight = useRef<number>(0);
	const degreeIntervalId = useRef<number | null>(null);
	const weightIntervalId = useRef<number | null>(null);

	//建立輪盤顏色
	const background = `conic-gradient(${list.map((_, index) => {
		const hsl = `hsl(${index * 360 / list.length}, 100%, 50%)`;
		return `${hsl} ${index * 360 / list.length}deg, ${hsl} ${(index + 1) * 360 / list.length}deg`;
	}).join(",")})`;


	const startSpin = () => {
		setIsSpin(true);
		speedFactor.current = 5 + Math.random() * 3;//隨機速度 5~8
		weight.current = 1.0;

		degreeIntervalId.current = window.setInterval(() => {
			degreeRef.current = (degreeRef.current + speedFactor.current * weight.current) % 360;
			setDegree(degreeRef.current);
		}, 1);

		//轉1~2秒
		window.setTimeout(() => {
			stopSpin();
		}, 1000 + Math.random() * 1000);
	};

	const stopSpin = () => {
		let time = 0;
		const easing = getRandomEasing();
		weightIntervalId.current = window.setInterval(() => {
			time += 0.001;
			weight.current = 1 - (easing(Math.min(time, 1)));

			if (weight.current <= 0) {
				//當權重歸零時，停止旋轉
				setIsSpin(false);
				if (weightIntervalId.current) {
					window.clearInterval(weightIntervalId.current);
					weightIntervalId.current = null;
				}
				onStop();
			}
		}, 1);
	};

	return (
		<div className="roulette-container">
			<div className="prevent-pointer-events roulette-triangle" />
			<div className='roulette-div'> {/**避免旋轉導致長寬改變而出現scroll bar */}
				<div className='prevent-pointer-events' style={{ transform: `rotate(${degree}deg)` }}>
					<ul className="roulette-circle" style={{ background: background }}>
						{
							//文字
							list.map((item, index) => {
								return (
									<li className="roulette-li" key={`roulette-${index}`} style={{ transform: `rotate(${(index + 0.5) * (360 / list.length)}deg)` }}>
										<div className="roulette-text" >
											{item}
										</div>
									</li>
								);
							})
						}
					</ul>
				</div >
			</div>

			<button className='prevent-select' onClick={startSpin} disabled={isSpin}>
				ROLL
			</button>
		</div>
	);
};