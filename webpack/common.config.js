const hash = require('string-hash');
const dirs = require('./dirs.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				include: [dirs.root, dirs.include],
				loader: 'awesome-typescript-loader',
			},
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader',
			},
			{
				test: /\.svg$/,
				use: ({ resource }) => {
					return {
						loader: '@svgr/webpack',
						options: {
							ref: true,
							svgoConfig: {
								plugins: [
									{
										removeViewBox: false,
									},
									{
										cleanupIDs: {
											prefix: `svg-${hash(resource)}`,
										},
									},
								],
							},
						},
					};
				},
			},
			{
				test: [/\.jpe?g$/, /\.png$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: '../static/media/[name].[hash:8].[ext]',
				},
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin(),
		new TypedCssModulesPlugin({
			globPattern: 'src/**/*.css',
		}),
	],
};
