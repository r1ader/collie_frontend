process.env.NODE_ENV = 'production'
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry:  './src/index.js',
    output: {
        filename: 'index.js', // 打包后文件名称
        path: path.resolve(__dirname, '../prod') // 打包后文件夹存放路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules中的代码
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /\.less$/,
                use: ['style-loader', {
                    loader: 'css-loader'
                },
                    {
                        loader: 'less-loader'
                    }]
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/, /src\/index\.css/],
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[path][name]__[local]'
                            }
                        }
                    }]
            },
            {
                test: /\.css$/,
                include: [/node_modules/, /src\/index\.css/],
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@less': path.resolve(__dirname, 'src', 'assets', 'less')
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',
            title: 'R1ader',
            template: './index.ejs'
            // favicon: path.resolve(__dirname, 'src/assets/image/favicon.ico')
        }),
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: ['javascript', 'json']
        })
    ]
}
