const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    mode: 'development',
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bandle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", "tsx"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "./src/index.html"
        })
    ]
}