"use strict"; // eslint-disable-line
/* eslint-env node*/

let path = require( "path" );
let srcDir = path.resolve( __dirname, "src" );

let LiveReloadPlugin = require( "webpack-livereload-plugin" );

let LiveReload = new LiveReloadPlugin();

module.exports = {
	entry: {
		"litequery": path.resolve( srcDir, "index" )
	},
	output: {
		path: path.resolve( __dirname, "dist" ),
		filename: "[name].js",
		library: "[name]",
		libraryTarget: "umd"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["es2015"]
				}
			}
		]
	},
	plugins: [
		LiveReload
	]
};
