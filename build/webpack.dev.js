const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
    mode: 'development', // 模式，表示dev环境
    entry: './src/index.js', // 入口文件
    module: {
        rules: [{
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
            }, {
                test: /\.ttf$/,
                use: ['file-loader']
            }
        ]
    }, // 让 webpack 能够去处理那些非 JavaScript 文件
    plugins: [
        new MonacoWebpackPlugin({
            // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
            languages: ['javascript', 'json']
        })
    ], // 插件
    output: {
        filename: 'index.js', // 打包后文件名称
        path: path.resolve(__dirname, '../dist') // 打包后文件夹存放路径
    },
    devServer: {
        host: 'localhost',
        port: '8000',
        compress: true,
        hot: true,
        open: true,
        contentBase: path.join(__dirname, '../dist'),
        proxy: {
            '/path': {
                target: 'https://caster2.aidigger.com/api/v1/run/dev',
                pathRewrite: {'^/path/': ''},
                headers: {
                    host: 'caster2.aidigger.com',
                    cookie: '_ga=GA1.2.2092037943.1562140647; UM_distinctid=16bc233837072b-07f16c7cc3ddee-37677e02-13c680-16bc2338371c15; code=600099; session_id=skey/600099; skey=9t6LX5O0Oy7c2O-VruOX4uHpBQWSYtWU; username=aGV5aWZhbg==; realname=5L2V5LiA5Yeh; thumb=/api/v1/avatar/default; hd=/api/v1/avatar/default; avatar=/api/v1/avatar/default; avatar_hd=/api/v1/avatar/default; SERVERID=77d50f83294194ee2a79502cdd44e390|1577185185|1577185182'
                }
            },
            '/proxy': {
                target: 'http://0.0.0.0:7001',
                pathRewrite: {'^/proxy/': ''},
                headers: {
                    host: 'caster2.aidigger.com',
                    cookie: '_ga=GA1.2.2092037943.1562140647; UM_distinctid=16bc233837072b-07f16c7cc3ddee-37677e02-13c680-16bc2338371c15; code=600099; session_id=skey/600099; skey=9t6LX5O0Oy7c2O-VruOX4uHpBQWSYtWU; username=aGV5aWZhbg==; realname=5L2V5LiA5Yeh; thumb=/api/v1/avatar/default; hd=/api/v1/avatar/default; avatar=/api/v1/avatar/default; avatar_hd=/api/v1/avatar/default; SERVERID=77d50f83294194ee2a79502cdd44e390|1577185185|1577185182'
                }
            }
        }
    }
}
