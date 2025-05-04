import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Roulette } from './component/roulette';
import { ItemList } from './component/itemList';
import { getRandomEasing } from './common/easing';

function App() {
	const [degree, setDegree] = useState(0);
	const [isSpin, setIsSpin] = useState(false);
	const [list, setList] = useState<string[]>(["Hello", "World"]);

	const speedFactor = useRef<number>(0);
	const weight = useRef<number>(0);
	const degreeIntervalId = useRef<number | null>(null);
	const weightIntervalId = useRef<number | null>(null);

	useEffect(() => {
		return () => {
			if (degreeIntervalId.current !== null) {
				window.clearInterval(degreeIntervalId.current);
				degreeIntervalId.current = null;
			}

			if (weightIntervalId.current !== null) {
				window.clearInterval(weightIntervalId.current);
				weightIntervalId.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (isSpin && degreeIntervalId.current === null) {
			degreeIntervalId.current = window.setInterval(() => {
				setDegree((deg) => (deg + speedFactor.current * weight.current) % 360);
			}, 1);
		} else if (!isSpin && degreeIntervalId.current !== null) {
			window.clearInterval(degreeIntervalId.current);
			degreeIntervalId.current = null;

			//計算出輪盤指到的項目，並顯示
			const targetIndex = Math.floor((360 - degree) / (360 / list.length));
			window.alert(list[targetIndex]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSpin]);

	const startSpin = () => {
		setIsSpin(true);
		speedFactor.current = 2 + Math.random() * 3;//隨機速度 2~5
		weight.current = 1.0;
		window.setTimeout(() => {
			stopSpin();
		}, 1000);
	};

	const stopSpin = () => {
		let time = 0;
		weightIntervalId.current = window.setInterval(() => {
			time += 0.001;
			const easing = getRandomEasing();
			weight.current = 1 - (easing(Math.min(time, 1)));

			if (weight.current <= 0 && weightIntervalId.current !== null) {
				//當權重歸零時，停止旋轉
				setIsSpin(false);
				window.clearInterval(weightIntervalId.current);
				weightIntervalId.current = null;
			}
		}, 1);
	};

	return (
		<div className="flex-row app">
			<div>
				<Roulette
					degree={degree}
					list={list}
				/>
				<button
					className='prevent-select'
					onClick={startSpin}
					disabled={isSpin}
				>
					{"ROLL"}
				</button>
			</div>

			<ItemList
				list={list}
				onchange={(newList) => {
					setList([...newList]);
				}}
			/>
		</div >
	);
}

export default App;
