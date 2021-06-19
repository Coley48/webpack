const {
    merge
} = require('webpack-merge');
const config = require('./webpack.common.js');
const webpack = require('webpack');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

// Progressive Web Application
let isPWA = false;
if (isPWA) {
    config.plugins.push(new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
    }));
}

module.exports = merge(config, {
    mode: 'production',
    output: {
        publicPath: '/static/bimo/',
        // publicPath: '',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // filename: '[name].bundle.css',
            filename: 'css/[name].[contenthash:8].css'
        }),
        // new webpack.ids.HashedModuleIdsPlugin({
        //     hashFunction: 'sha256',
        //     hashDigest: 'hex',
        //     hashDigestLength: 8
        // }),
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
    }
});