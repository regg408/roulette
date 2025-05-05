import { useEffect, useRef, useState } from 'react';
import { Roulette } from './component/roulette';
import { ItemList } from './component/itemList';
import { getRandomEasing } from './common/easing';
import { LinkBar } from './component/linkBar';
import { VersionBanner } from './component/versionBanner';
import { Modal } from './component/modal';

function App() {
	const [degree, setDegree] = useState(0);
	const [isSpin, setIsSpin] = useState(false);
	const [list, setList] = useState<string[]>(JSON.parse(localStorage.getItem("list") ?? "null") ?? ["Hello", "World"]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [result, setResult] = useState<string>("");
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
		if (!isSpin && degreeIntervalId.current) {
			window.clearInterval(degreeIntervalId.current);
			degreeIntervalId.current = null;
			//計算出輪盤指到的項目，並顯示
			const targetIndex = Math.floor((360 - degree) / (360 / list.length));
			setResult(list[targetIndex]);
			setShowModal(true);
		}
	}, [degree, isSpin, list]);

	const onListUpdate = (newList: string[]) => {
		setList([...newList]);
		localStorage.setItem("list", JSON.stringify(newList));
	};

	const startSpin = () => {
		setIsSpin(true);
		speedFactor.current = 5 + Math.random() * 3;//隨機速度 5~8
		weight.current = 1.0;

		degreeIntervalId.current = window.setInterval(() => {
			setDegree((deg) => (deg + speedFactor.current * weight.current) % 360);
		}, 1);

		//轉1~2秒
		window.setTimeout(() => {
			stopSpin();
		}, 1000 + Math.random() * 1000);
	};

	const stopSpin = () => {
		let time = 0;
		weightIntervalId.current = window.setInterval(() => {
			time += 0.001;
			const easing = getRandomEasing();
			weight.current = 1 - (easing(Math.min(time, 1)));

			if (weight.current <= 0) {
				//當權重歸零時，停止旋轉
				setIsSpin(false);
				if (weightIntervalId.current) {
					window.clearInterval(weightIntervalId.current);
					weightIntervalId.current = null;
				}
			}
		}, 1);
	};

	const onCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div
			className="flex-column"
			style={{
				width: "100%",
				minWidth: "1000px",
				justifyContent: "space-evenly",
				margin: "10px",
			}}
		>
			<div className="flex-row" style={{ justifyContent: "space-evenly" }}			>
				<LinkBar />

				<div>
					<Roulette degree={degree} list={list} />
					<button
						className='prevent-select'
						onClick={startSpin}
						disabled={isSpin}
					>
						ROLL
					</button>
				</div>

				<ItemList list={list} onchange={onListUpdate} />
			</div>

			<VersionBanner />

			<Modal show={showModal} text={result} onClose={onCloseModal} />
		</div >
	);
}

export default App;
