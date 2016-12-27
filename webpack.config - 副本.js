// webpack.config.js
var path = require('path')
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ 'common', /* filename= */ 'common.js'); // 分析以下模块的共用代码, 单独打一个包到common.js
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 单独打包CSS

module.exports = {
		entry: './src/app.js',
		output: {
			path: path.resolve(__dirname, './dist'),
			publicPath: '/dist/',
			filename: '[name].js',
			chunkFilename: "[id].chunk.js?[hash:8]"
		},
		plugins: [
			commonsPlugin,
			new ExtractTextPlugin('[name].css', {
				allChunks: true
			}), // 单独打包CSS

		],

		module: {
			loaders: [{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						// vue-loader options go here
					},
					{
						test: /\.js$/,
						loader: 'babel-loader', // ES6
						exclude: /(node_modules|bower_components|ppaweb\\libs\\webpack)/
					},

					// CSS,LESS单独打包
					{
						test: /\.css$/,
						loader: ExtractTextPlugin.extract("style-loader", "css-loader")
					},
					{
						test: /\.less$/,
						loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
					},

					{
						test: /\.(png|jpg|gif)$/,
						query: {
							name: '[path][name].[ext]?[hash:8]',
							limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
						}
					},
					{
						test: /\.(svg|eot|woff|woff2|ttf)$/,
						loader: 'file-loader'
					}

				]
			},
			resolve: {
				alias: {
					vue$: 'vue/dist/vue',
					assets: path.join(__dirname, './src/assets'),
					plugin: path.join(__dirname, './src/components'),
					store: path.join(__dirname, './src/vuex/store.js')
				},
				extensions: ['.js', '.vue']
			},
			devServer: {
				historyApiFallback: true,
				noInfo: true
			}
		};

		var webpack = require('webpack')
		var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
		var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 单独打包CSS
		module.exports = {
			entry: './src/app.js',
			output: {
				path: path.resolve(__dirname, './dist'),
				publicPath: '/dist/',
				filename: 'build.js',
				chunkFilename: "[id].chunk.js?[hash:8]"
			},
			module: {
				rules: [{
						test: /\.css$/,
						loader: ExtractTextPlugin.extract('style-loader!css-loader'),

					}, {
						test: /\.less$/,
						loader: ExtractTextPlugin.extract('style-loader!css-loader!less-loader'),

					}, {
						test: /\.json$/,
						loader: 'json-loader',
					}, {
						test: /\.vue$/,
						loader: 'vue-loader',
						options: {
							// vue-loader options go here
						}
					},

					{
						test: /\.js$/,
						loader: 'babel-loader',
						exclude: /node_modules/
					}, {
						test: /\.(png|jpg|gif)$/,
						query: {
							name: '[path][name].[ext]?[hash:8]',
							limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
						}
					}, {
						test: /\.(svg|eot|woff|woff2|ttf)$/,
						loader: 'file-loader'
					}
				]
			},
			resolve: {
				alias: {
					vue$: 'vue/dist/vue',
					assets: path.join(__dirname, './src/assets'),
					plugin: path.join(__dirname, './src/components'),
					store: path.join(__dirname, './src/vuex/store.js')
				},
				extensions: ['.js', '.vue']
			},
			devServer: {
				historyApiFallback: true,
				noInfo: true
			},
			plugins: [
				new ExtractTextPlugin('[name].css', {
					allChunks: true
				}), // 单独打包CSS
			],
			devtool: '#eval-source-map'
				//devtool: false
		}

		if(process.env.NODE_ENV === 'production') {
			module.exports.devtool = '#source-map'
				// http://vue-loader.vuejs.org/en/workflow/production.html
			module.exports.plugins = (module.exports.plugins || []).concat([

				new webpack.DefinePlugin({
					'process.env': {
						NODE_ENV: '"production"'
					}
				}),
				new webpack.optimize.UglifyJsPlugin({
					//sourceMap: true,
					compress: {
						warnings: false
					}
				}),
				new webpack.LoaderOptionsPlugin({
					minimize: true
				})
			])
		}