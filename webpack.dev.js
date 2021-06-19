const config = require('./webpack.common.js');
const {
    merge
} = require('webpack-merge');

module.exports = merge(config, {
    mode: 'development',
    devtool: 'source-map',
    output: {
        publicPath: '',
    },
    devServer: {
        open: true,
        port: 8000,
        // contentBase: 'src',
        hot: true,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    },
                    'less-loader'
                ]
            },
        ]
    },
    optimization: {
        runtimeChunk: 'single'
    }

});