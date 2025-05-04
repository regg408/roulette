import githubIcon from "./../assets/github-mark-white.svg";

export const LinkBar = () => {
	return (
		<div>
			<a href="https://github.com/regg408/roulette">
				<img className="round" src={githubIcon} alt="github" />
			</a>
		</div>
	);
};