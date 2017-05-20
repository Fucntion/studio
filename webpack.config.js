var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin"); // 单独打包CSS //npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4 默认安装的版本有毒

module.exports = {
	entry: {
		app: './src/app.js',
		vender:['vue','vuex','vue-resource','vue-router'],
		vender2:'element-ui'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: '[name].js',
		chunkFilename: "chunks/[name].chunk.js?[hash:8]"
	},
	plugins: [
	//使用该插件 由于app.js import了这些依赖 webpack会加载到app.js中
	//使用该插件 将公共依赖放入vender.js中 使单个文件变小
		new webpack.optimize.CommonsChunkPlugin({
			name:['vender2','vender'],
			minChunks:Infinity,
			filename:'[name].js'
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			allChunks: true
		}), // 单独打包CSS

	],
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue-loader'
			}, {
				test: /\.js$/,
				loader: 'babel-loader', // ES6
				exclude: /(node_modules|bower_components|ppaweb\\libs\\webpack)/
			},

			// CSS,LESS单独打包
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader'
				})
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader!less-loader'
				})
			},

			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				query: {
					name: 'img/[name].[ext]?[hash:8]',
//					limit: 8192 // inline base64 URLs for <=8k images, direct URLs for the rest
				}
			}, {
				test: /\.(svg|eot|woff|woff2|ttf)$/,
				loader: 'file-loader',
				query: {
					name: 'font/[name].[ext]'
				}
			}
		]
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue',
			assets: path.join(__dirname, './src/assets'),
			plugin: path.join(__dirname, './src/components'),
			store: path.join(__dirname, './src/vuex/store.js'),
//			static: path.join(__dirname, './static'),
			jquery:'jquery',
		},
		extensions: ['.js', '.vue']
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	devtool: '#eval-source-map'
};

if(process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'

	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false,
	// 			drop_debugger: true,
    // drop_console: true
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		// new webpack.ProvidePlugin({
    //       $: "jquery",
    //       jQuery: "jquery"
    //   	})
	])
}
