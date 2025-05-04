interface RouletteProps {
	degree: number;
	list: string[];
}

/**
 * 輪盤元件，使用背景畫出分割後的輪盤
 * @param props 
 * @returns 
 */
export const Roulette = (props: RouletteProps) => {
	const { degree, list } = props;

	//建立輪盤顏色
	const background = `conic-gradient(${list.map((_, index) => {
		const hsl = `hsl(${index * 360 / list.length}, 100%, 50%)`;
		return `${hsl} ${index * 360 / list.length}deg, ${hsl} ${(index + 1) * 360 / list.length}deg`;
	}).join(",")})`;

	return (
		<div className="prevent-select roulette-container">
			<div className="triangle" />
			<div
				style={{
					transform: `rotate(${degree}deg)`
				}}
			>
				<ul
					className="roulette-circle"
					style={{ background: background }}
				>
					{
						//文字
						list.map((item, index) => {
							return (
								<li
									className="roulette-li"
									key={`roulette-${index}`}
								>
									<div
										className="roulette-text"
										style={{
											width: "100%",
											height: "100%",
											transform: `rotate(${(index + 0.5) * (360 / list.length)}deg)`,
										}}
									>
										<br />
										{item}
									</div>
								</li>
							);
						})
					}
				</ul>
			</div >
		</div>
	);
};