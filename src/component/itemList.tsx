import { useState } from 'react';
import { Item } from './item';
import addIcon from './../assets/add.svg';
import './itemList.css';

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
	const { list, onchange } = props;
	const [itemName, setItemName] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	const addItem = () => {
		if (itemName.trim() === "") {//空名檢查
			setError("請輸入名稱!!");
			return;
		}

		if (list.includes(itemName)) {//名稱檢查
			setError("名稱已存在!!");
			return;
		}

		const newList = [...list];
		newList.push(itemName);
		onchange(newList);
		setItemName("");
	};

	const onTextBoxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setItemName(ev.currentTarget.value);
		setError(null);
	};

	const onTextBoxKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") {//Enter新增
			addItem();
		}
	};

	const onTextBoxBlur = () => {
		setError(null);
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
				className="flex-column"
				style={{
					position: "relative"
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
						className="itemList-textBox"
						type="text"
						placeholder="請輸入項目"
						style={{
							border: error ? "1px solid red" : "1px solid white",
							outline: error ? "red" : "white",
						}}
						value={itemName}
						onChange={onTextBoxChange}
						onKeyDown={onTextBoxKeyDown}
						onBlur={onTextBoxBlur}
					/>
					<button
						className="round"
						onClick={onAddClick}
					>
						<img src={addIcon} alt="add" />
					</button>
				</div>
				{
					error && (
						<div className="error-hint">
							{error}
						</div>
					)
				}
			</div>

			<br />

			<div className="flex-column itemList-list">
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