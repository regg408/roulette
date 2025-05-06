import { useRef, useState } from 'react';
import { Roulette } from './component/roulette';
import { ItemList } from './component/itemList';
import { Modal } from './component/modal';
import { AppBar } from './component/appBar';

function App() {
	const degree = useRef<number>(0);
	const [list, setList] = useState<string[]>(JSON.parse(localStorage.getItem("list") ?? "null") ?? ["Hello", "World"]);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [result, setResult] = useState<string>("");


	const onListUpdate = (newList: string[]) => {
		setList([...newList]);
		localStorage.setItem("list", JSON.stringify(newList));
	};


	const onRouletteStop = () => {
		const targetIndex = Math.floor((360 - degree.current) / (360 / list.length));
		setResult(list[targetIndex]);
		setShowModal(true);
	};

	const onCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className="app-container">
			<AppBar />

			<div className="app-func">
				<Roulette degreeRef={degree} list={list} onStop={onRouletteStop} />

				<ItemList list={list} onchange={onListUpdate} />
			</div>


			<Modal show={showModal} text={result} onClose={onCloseModal} />
		</div >
	);
}

export default App;
