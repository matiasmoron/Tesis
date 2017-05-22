var path = require('path');
var webpack = require('webpack');

var config = {
	devtool:'source-map',
	entry:[
		'webpack-hot-middleware/client',
		'./src/main.jsx'
	],
	output:{
		path    :path.join(__dirname,'vistas'),
		filename:'bundle.js'
	},
	module:{
		rules:[
			{
				test   : /\.jsx$/,
				exclude:/node_modules/,
				use    :[
					'react-hot-loader',
					'babel-loader'
				]
			},
			// {
			// 	test: /\.(png|woff|woff2|eot|ttf|svg)$/,
			// 	use:[{
			// 		loader: 'url-loader',
			// 		options:{
			// 			limit: 100000,
			// 			name: 'assets/resources/[name].[ext]'
			// 		}
			// 	}]
			// },
			{
				test: /\.scss$/,
				use:[
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	resolve:{
		modules:[
			path.join(__dirname,'node_modules')
		],
		extensions:['.jsx','.js']
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};

module.exports = config;
