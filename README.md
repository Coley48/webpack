## webpack 学习笔记

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.
> 本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图 (dependency graph) ，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

### 项目搭建

webpack 是基于 nodejs 的，因此 webpack 项目也是一个 node 项目，直接使用 npm 来初始化项目；对于大多数项目，建议本地安装，便于后期分项目升级；

1. 使用`npm init`命令初始化项目文件夹，创建`package.json`文件；
2. 安装 webpack 和 webpack-cli 开发依赖；

```sh
> npm init -y
> npm install webpack webpack-cli -D
```

以该项目为例，目录结构如下：

```txt
.
├── .gitignore
├── README.md
├── LICENSE
├── package.json
├── package-lock.json
├── node_modules
├── src
|   └── index.js
└── dist
```

### 简单使用

1. 新建一个模块`a.js`，并在里面编写一个简单的打印函数；

```js
// src/a.js
function print(params) {
    console.log(params);
}

module.exports = {
    print,
};
```

2. 新建入口`index.js`，并引入模块`a.js`；

```js
// src/index.js
const moduleA = require("./a");

moduleA.print("Hello, world!");
```

3. 运行 `npx webpack` 开始打包，结果将被输出到根目录下 dist 文件夹中，并得到以下输出：

```bash
asset main.js 224 bytes [compared for emit] [minimized] (name: main)
./src/index.js 83 bytes [built] [code generated]
./src/a.js 104 bytes [built] [code generated]

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

webpack 5.37.1 compiled with 1 warning in 201 ms
```

4. 得到打包好的输出文件`dist/main.js`；

```js
// dist/main.js
(()=>{var r={85:r=>{r.exports={print:function(r){console.log(r)}}}},o={};(function t(e){var n=o[e];if(void 0!==n)return n.exports;var p=o[e]={exports:{}};return r[e](p,p.exports,t),p.exports})(85).print("Hello, world!")})();
```

### 基本概念

- **入口**（entry）：指示 webpack 应该使用哪个模块，来作为构建其内部依赖图（dependency graph）的开始，默认值是`./src/index.js`。
- **输出**（output）：告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在`./dist`文件夹中。
- **加载器**（loader）：让 webpack 能够去处理 js 和 json 以外的其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。 
- **插件**（plugin）：让 webpack 可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量等。                           
- **模式**（mdoe）：通过选择`development`、`production`或`none`之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为`production`。
- **目标**（target）：告知 webpack 为部署目标指定一个环境。默认值为`browserslist`，如果没有找到`browserslist`的配置，则默认为`web`。      
- **模块热替换**（HMR - hot module replacement）：是指在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面。
- **初始化块**（initail chunk） 是入口起点的主块。此 chunk 包含为入口起点指定的所有模块及其依赖项。默认名为`main.js`。
- **非初始化块** （non-initial chunk）是可以延迟加载的块。可能会出现在使用 动态导入(dynamic imports) 或者 SplitChunksPlugin 时。默认情况下，这些非初始化块没有名称，因此会使用唯一 ID 来替代名称。

### 基本配置

webpack 可以无需使用任何配置文件。webpack 会假定项目的入口起点为`src/index.js`，然后会在`dist/main.js`输出结果，并且在生产环境开启压缩和优化。但通常我们还需要对 webpack 进行更精细化的配置，以充分发挥 webpack 的能力。

习惯性的将配置文件拆分为三个配置文件，并提取公共配置部分到`webpack.common.js`，然后分别将开发模式和生产模式的配置放在`webpack.dev.js`和`webpack.prod.js`中，并用`webpack-merge`合并公共部分的配置。

最后`package.json`中添加 webpack 的 script 启动命令，让 webpack 使用自定义的配置文件替代默认的`webpack.config.js`：

**package.json**
```json
"script" : {
    "serve": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
}
```

将相同的公共配置放入`webpack.common.js`中：

**webpack.common.js**
```js

```

将开发模式的配置放入`webpack.dev.js`中：

**webpack.dev.js**
```js

```

将生产模式的配置放入`webpack.prod.js`中：

**webpack.prod.js**
```js

```

使用 webpack-cli 脚手架初始化项目，需要安装 @webpack-cli/generators 依赖；
根据项目需要选择相应配置；
```sh
> npx webpack-cli init <project>
```

#### 实现热重载

热重载能为开发提供极大的便利，不需要每次修改代码后手动编译，然后在浏览器中手动刷新页面来观察效果；同时每次只更新改动部分的代码，并且将编译的结果存在内存中；这里提供两种实现热重载的方式：

通过在内存中（而不是写入磁盘）编译和 serve 资源来提高性能：

**webpack-dev-serve**
使用 webpack 官方提供的开发服务器实现热重载是最简便的方式，需要安装开发依赖`webpack-dev-serve`，然后只需要在`webpack.dev.js`配置文件中添加 sever 的相关配置即可；

**webpack watch + live server**
使用 webpack 的 watch 模式是一种替代方案，它会实时监听文件的变动，保存后便开始编译，并将文件输出到 dist 文件夹下

### 附录

0. 待完善
```txt
安装加载器 loader -D
css-loader
style-loader
file-loader
csv-loader
xml-loader
ts-loader
source-map-loader

安装插件 plugin -D
html-webpack-plugin
mini-css-extract-plugin
```

1. package.json 属性说明

| 属性              | 含义                                                                                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`            | 设置软件包的名称。                                                                                                                                       |
| `author`          | 列出软件包的作者名称。                                                                                                                                   |
| `contributors`    | 除作者外，该项目可以有一个或多个贡献者。 此属性是列出他们的数组。                                                                                        |
| `bugs`            | 链接到软件包的问题跟踪器，最常用的是 GitHub 的 issues 页面。                                                                                             |
| `homepage`        | 设置软件包的主页。                                                                                                                                       |
| `version`         | 指定软件包的当前版本。x.x.x 分别表示主版本号、次版本号、补丁版本号仅修复缺陷的版本是补丁版本，引入向后兼容的更改的版本是次版本，具有重大更改的是主版本。 |
| `license`         | 指定软件包的许可证。                                                                                                                                     |
| `keywords`        | 此属性包含与软件包功能相关的关键字数组。                                                                                                                 |
| `description`     | 此属性包含了对软件包的简短描述。                                                                                                                         |
| `repository`      | 此属性指定了此程序包仓库所在的位置。                                                                                                                     |
| `main`            | 设置软件包的入口点。                                                                                                                                     |
| `private`         | 如果设置为 true，则可以防止应用程序/软件包被意外发布到 npm 上。                                                                                          |
| `scripts`         | 可以定义一组可以运行的 node 脚本。                                                                                                                       |
| `dependencies`    | 设置作为依赖安装的 npm 软件包的列表。                                                                                                                    |
| `devDependencies` | 设置作为开发依赖安装的 npm 软件包的列表。                                                                                                                |
| `browserslist`    | 用于告知要支持哪些浏览器（及其版本）。 Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。                        |

2. 软件包版本说明符

| 符号   | 含义                                                                          |
| :----- | :---------------------------------------------------------------------------- |
| ~      | 如果写入的是 〜0.13.0，则只更新补丁版本：即 0.13.1 可以，但 0.14.0 不可以。   |
| ^      | 如果写入的是 ^0.13.0，则要更新补丁版本和次版本：即 0.13.1、0.14.0、依此类推。 |
| *      | 如果写入的是 *，则表示接受所有的更新，包括主版本升级。                        |
| >      | 接受高于指定版本的任何版本。                                                  |
| >=     | 接受等于或高于指定版本的任何版本。                                            |
| <=     | 接受等于或低于指定版本的任何版本。                                            |
| <      | 接受低于指定版本的任何版本。                                                  |
| 无符号 | 仅接受指定的特定版本。                                                        |
| latest | 使用可用的最新版本。                                                          |
| \|\|   | 使用范围组合                                                                  |  | 使用范围组合 |

### 参考资料

- [webpack中文官方文档](https://webpack.docschina.org/concepts/)
- [webpack v4 官网](https://v4.webpack.js.org/)
- [一个简单打包工具的详细说明](https://github.com/ronami/minipack)
- [nodejs 中的依赖管理](https://blog.csdn.net/weixin_33936401/article/details/87963738)