const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const env = require('./src/config/development');

var LessPluginCleanCSS = require('less-plugin-clean-css');
const autoprefixer = require('autoprefixer')

const PROD = (process.env.NODE_ENV === 'development')

module.exports = {
	resolve: {
		// root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	entry:'./src/app.js',
	output: {
		path: path.join(__dirname, 'src/build/js'),
		publicPath: './src/build/js',
		filename: 'common.min.js'
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: [/node_modules/],
			loader: 'babel'
		}, {
			test: /\.json$/,
			exclude: [/node_modules/],
			loaders: ['json-loader']
		}, {
			test: /\.css$/,
			loaders: [
				'style',
				'css?importLoaders=1',
				'font?format[]=truetype&format[]=woff&format[]=embedded-opentype'
			]
		}, {
			test: /\.less$/,
			loader: "style!css!less"
		}, , {
			test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
			loader: 'path-file-loader',
			query: {
				name: '[name].[hash].[ext]',
				publicPath: './src/img',
				cssPath: '../src/img'
			}
		}],
		lessLoader: {
			lessPlugins: [
				new LessPluginCleanCSS({
					advanced: true
				})
			]
		}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
	],
	postcss: function() {
		return [
			// precss(),
			autoprefixer({
				browsers: ['last 3 versions', 'iOS 8', 'Android 4']
			})
		]
	},
	stats: {
        colors: true
    },
    devtool: 'eval',
	devServer: {
		contentBase: 'src/',
		port: env.hot_server_port,
		hot: true,
		inline: true
	}
}