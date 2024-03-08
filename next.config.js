/** @type {import('next').NextConfig} */
const nextConfig = {
	assetPrefix: process.env.NODE_ENV === "staging" ? "/rekor-search-ui/" : "",
	basePath:
		process.env.BASE_PATH || process.env.NODE_ENV === "staging"
			? "/rekor-search-ui"
			: "",
	output: "export",
	reactStrictMode: true,
	transpilePackages: ["@patternfly/react-core", "@patternfly/react-styles"],
};

module.exports = nextConfig;
