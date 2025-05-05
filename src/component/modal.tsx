import './modal.css';

interface ModalProps {
	show: boolean;
	text: string;
	onClose: () => void;
}

export const Modal = (props: ModalProps) => {
	const { show, text, onClose } = props;

	return (
		<div
			className='modal-container'
			style={{ display: show ? 'flex' : 'none' }}
			onClick={onClose}
		>
			<div className="modal-content">
				<div className="modal-header">
					<h2>抽選結果</h2>
				</div>
				<div className="modal-body">
					<h2>{text}</h2>
				</div>
			</div>
		</div>
	);
};