/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: [
		"@patternfly/react-core",
		"@patternfly/react-icons",
		"@patternfly/react-styles",
	],
};

module.exports = nextConfig;
