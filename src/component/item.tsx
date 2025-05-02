import deleteIcon from './../assets/delete.svg';

interface ItemProps {
	name: string;
	onDelete: () => void;
}

/**
 * 清單內項目元件
 * 顯示名稱、包含一個刪除按鈕
 * @param props 
 * @returns 
 */
export const Item = (props: ItemProps) => {
	const { name, onDelete } = props;

	return (
		<div className="item">
			<div>{name}</div>
			<button onClick={onDelete}>
				<img src={deleteIcon} alt="delete" />
			</button>
		</div>
	);
};