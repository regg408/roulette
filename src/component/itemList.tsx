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

	const addItem = () => {
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

	const onTextBoxKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") {//Enter新增
			addItem();
		}
	};

	const onAddClick = () => {
		addItem();
	};


	return (
		<div
			className="flex-column"
			style={{
				width: "275px"
			}}
		>
			<div
				className="flex-row"
				style={{
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<input
					type="text"
					placeholder="請輸入項目"
					style={{
						height: "80%",
						width: "75%"
					}}
					value={itemName}
					onChange={(ele) => {
						setItemName(ele.currentTarget.value);
					}}
					onKeyDown={onTextBoxKeyDown}
				/>

				<button
					className="round-button"
					onClick={onAddClick}
				>
					<img src={addIcon} alt="add" />
				</button>
			</div>

			<br />

			<div className="flex-column itemList">
				{
					list.map((eleName, index) => {
						return (
							<Item
								key={`item-${index}`}
								name={eleName}
								list={list}
								onDelete={() => {
									const newList = [...list];
									newList.splice(index, 1);
									onchange(newList);
								}}

								onEditName={(newName) => {
									const newList = [...list];
									newList[index] = newName;
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