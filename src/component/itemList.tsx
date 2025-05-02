import { useState } from 'react';
import addIcon from './../assets/add.svg';
import { Item } from './item';

interface ItemListProps {
	list: string[];
	onchange: (list: string[]) => void;
}

/**
 * 項目清單
 * @param props 
 * @returns 
 */
export const ItemList = (props: ItemListProps) => {
	const [itemName, setItemName] = useState<string>("");
	const { list, onchange } = props;

	const onAddClick = () => {
		if (itemName.trim() === "") {//空名檢查
			window.alert("請輸入名稱!!");
			return;
		}

		if (list.includes(itemName)) {//名稱檢查
			window.alert("名稱已存在!!");
			return;
		}

		const newList = [...list];
		newList.push(itemName);
		onchange(newList);
		setItemName("");
	};


	return (
		<div
			className="flex-column"
			style={{
				justifyContent: "left"
			}}
		>
			<div
				className="flex-row"
				style={{
					alignItems: "center"
				}}
			>
				<input
					type="text"
					placeholder="請輸入項目"
					style={{
						height: "100%"
					}}
					value={itemName}
					onChange={(ele) => {
						setItemName(ele.currentTarget.value);
					}}
				/>

				<button onClick={onAddClick}>
					<img src={addIcon} alt="add" />
				</button>
			</div>

			<br />

			<div className="flex-column itemList">
				{
					list.map((ele, index) => {
						return (
							<Item
								key={`item-${index}`}
								name={ele}
								onDelete={() => {
									const newList = [...list];
									newList.splice(index, 1);
									onchange(newList);
								}}
							/>
						);
					})
				}
			</div>
		</div>
	);
};