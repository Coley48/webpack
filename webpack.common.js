const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 项目地址： https://github.com/jantimon/html-webpack-plugin

// 如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。
// console.log(__dirname, __filename);
// D:\webpack\test D:\webpack\test\webpack.config.js

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // 每个额外的 loader/plugin 都有其启动时间，应尽量少地使用工具。
    },
    module: {
        rules: [{
            test: /\.js$/,
            // 使用 include 字段仅将 loader 应用在实际需要将其转换的模块；
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
        }, ],
    },
    resolve: {
        // 减少 resolve.modules, resolve.extensions, resolve.mainFiles, resolve.descriptionFiles 中条目数量，因为他们会增加文件系统调用的次数。
        // 如果你不使用 symlinks（例如 npm link 或者 yarn link），可以设置 resolve.symlinks: false。
        symlinks: false,
        // 如果你使用自定义 resolve plugin 规则，并且没有指定 context 上下文，可以设置 resolve.cacheWithContext: false。

    },
    optimization: {
        // splitChunksPlugin 默认配置
        splitChunks: {
            chunks: 'async', // 对哪些块进行优化，all | async | initial，
            minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
            minRemainingSize: 0,
            minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
            maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
            maxInitialRequests: 30, // 入口点的最大并行请求数。
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
};