const {
    merge
} = require('webpack-merge');
const config = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(config, {
    mode: 'production',
    output: {
        publicPath: '',
    },
    plugins: [
        new MiniCssExtractPlugin({
            // filename: '[name].bundle.css',
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: "[id].[contenthash].css",
            attributes: {
                id: "target",
                "data-target": "example",
            },
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                sideEffects: true,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                sideEffects: true,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../"
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            // 默认根据入口文件分别提取到不同的文件，可以将 css 提取到一个文件
            // cacheGroups: {
            //     styles: {
            //         name: "styles",
            //         type: "css/mini-extract",
            //         // For webpack@4
            //         // test: /\.css$/,
            //         chunks: "all",
            //         enforce: true,
            //     },
            // },
        },
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            // new CssMinimizerPlugin(),
        ],
    },
});