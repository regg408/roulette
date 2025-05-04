import { useEffect, useState } from 'react';
import deleteIcon from './../assets/delete.svg';
import editIcon from './../assets/edit.svg';

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

	useEffect(() => {
		setEditName(name);
	}, [name]);

	//更新名稱
	const onUpdateEditName = () => {
		const isConflict = list.some((eleName) => {
			if (name === eleName) {//跳過自己
				return false;
			}
			return editName === eleName;
		});

		if (isConflict) {
			window.alert("名稱已存在!!");
			setEditName(name);
		} else {
			onEditName(editName);
		}
		setIsEdit(false);
	};

	//文字視窗按鍵事件
	const onTextBoxKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
		if (ev.key === "Enter") {
			onUpdateEditName();
		}
	};

	const onTextBoxBlur = () => {
		onUpdateEditName();
	};

	return (
		<div className="item">
			{
				isEdit ?
					(<input
						type="text"
						placeholder="請輸入項目"
						style={{
							width: "150px",
							height: "80%",
						}}
						value={editName}
						onChange={(ele) => {
							setEditName(ele.target.value);
						}}
						onBlur={onTextBoxBlur}
						onKeyDown={onTextBoxKeyDown}
						autoFocus

					/>) :
					(<div
						style={{
							textAlign: "left",
							width: "150px"
						}}
					>
						{editName}
					</div>)
			}

			<div>
				<button
					className="round-button"
					onClick={() => {
						setIsEdit(true);
						setEditName(name);
					}}
				>
					<img src={editIcon} alt="delete" />
				</button>
				<button
					className="round-button"
					onClick={onDelete}
				>
					<img src={deleteIcon} alt="delete" />
				</button>
			</div>
		</div>
	);
};