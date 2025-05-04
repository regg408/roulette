export const VersionBanner = () => {
	return (
		<div style={{ color: "gray" }}>
			v{__PACKAGE_JSON_VERSION__}
		</div>
	);
};