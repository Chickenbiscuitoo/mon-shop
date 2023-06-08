/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.pokemontcg.io',
			},
			{
				protocol: 'https',
				hostname: 'via.placeholder.com',
			},
			{
				protocol: 'https',
				hostname: 'media0.giphy.com',
			},
		],
	},
}

module.exports = nextConfig
