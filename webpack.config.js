const path = require('path');
const merge = require('webpack-merge');
const dirs = require('./webpack/dirs.js');
const commonConfig = require('./webpack/common.config.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaderInclude = [path.resolve(__dirname, 'src'), dirs.include];

module.exports = (env, argv) => {
	return [
		merge(commonConfig, {
			entry: './src/index.tsx',
			output: {
				path: dirs.dist,
				filename: 'main.js',
			},
			devServer: {
				contentBase: dirs.dist,
				compress: true,
				https: true,
				port: 9002,
				// open: 'Google Chrome',
			},
			devtool: 'source-map',
			module: {
				rules: [
					{
						test: /\.css?$/,
						include: loaderInclude,
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'css-loader',
								options: {
									modules: {
										localIdentName:
											argv.mode === 'production' ? '[hash:10]' : '[name]__[local]_[hash:5]',
									},
									localsConvention: 'camelCase',
								},
							},
							{
								loader: 'postcss-loader',
								options: {
									config: {
										path: path.resolve('./postcss.config.js'),
									},
								},
							},
						],
					},
				],
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: 'src/assets/static/index.html',
				}),
			],
		}),
	];
};
