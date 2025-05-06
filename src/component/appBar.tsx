import githubIcon from './../assets/github-mark-white.svg';
import './appBar.css';

export const AppBar = () => {
	return (
		<div className='appBar-container'>
			<div>
				<a href="https://github.com/regg408/roulette">
					<img className="round" src={githubIcon} alt="github" />
				</a>
			</div>

			<div style={{ color: "gray" }}>
				v{__PACKAGE_JSON_VERSION__}
			</div>
		</div>
	);
};