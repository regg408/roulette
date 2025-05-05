import { useEffect, useState } from 'react';
import deleteIcon from './../assets/delete.svg';
import editIcon from './../assets/edit.svg';
import './item.css';

interface ItemProps {
	name: string;
	list: string[];
	onDelete: () => void;
	onEditName: (newName: string) => void;
}

/**
 * 清單內項目元件
 * 顯示名稱、包含一個刪除按鈕
 * @param props 
 * @returns 
 */
export const Item = (props: ItemProps) => {
	const { name, list, onDelete, onEditName } = props;
	const [editName, setEditName] = useState<string>(name);
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setEditName(name);
	}, [name]);

	const onTextBoxChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setEditName(ev.target.value);
		setError(null);
	};

	//文字方塊按鍵事件
	const onTextBoxKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		if (ev.key !== "Enter") {
			return;
		}

		if (editName.trim() === "") {
			setError("請輸入名稱!!");
			return;
		}

		const isConflict = list.some((eleName) => {
			if (name === eleName) {//跳過自己
				return false;
			}
			return editName === eleName;
		});

		if (isConflict) {
			setError("名稱已存在!!");
			return;
		}

		onEditName(editName);
		setIsEdit(false);
	};

	//文字方塊失焦事件
	const onTextBoxBlur = () => {
		setEditName(name);
		setIsEdit(false);
		setError(null);
	};

	return (
		<div className="item-container">
			{
				isEdit ?
					(
						<div style={{ position: "relative", height: "100%" }}>
							<input
								className="item-textBox"
								type="text"
								placeholder="請輸入項目"
								style={{
									border: error ? "1px solid red" : "1px solid white",
									outline: error ? "red" : "white",
								}}
								value={editName}
								onChange={onTextBoxChange}
								onBlur={onTextBoxBlur}
								onKeyDown={onTextBoxKeyDown}
								autoFocus
							/>
							{error && (
								<div className="error-hint">
									{error}
								</div>
							)}
						</div>
					)
					:
					(
						<div
							style={{
								textAlign: "left",
								width: "150px"
							}}
						>
							{editName}
						</div>
					)
			}

			<div>
				<button
					className="round"
					onClick={() => {
						setIsEdit(true);
						setEditName(name);
					}}
				>
					<img src={editIcon} alt="delete" />
				</button>
				<button
					className="round"
					onClick={onDelete}
				>
					<img src={deleteIcon} alt="delete" />
				</button>
			</div>
		</div>
	);
};