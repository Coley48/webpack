## webpack 学习笔记

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.
> 本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个依赖图 (dependency graph) ，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

### 项目搭建

webpack 是基于 nodejs 的，因此 webpack 项目也是一个 node 项目，直接使用 npm 来初始化项目；

1. 使用`npm init`初始化项目文件夹，主要是创建`package.json`，也可手动；
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

3. 运行 npx webpack 开始打包，结果输出到根目录下 dist 文件夹中，并得到以下输出：

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
(()=>{var r={85:r=>{r.exports={print:function(r){console.log(r)}}}},o={};(function t(e){var n=o[e];if(void 0!==n)return n.exports;var p=o[e]={exports:{}};return r[e](p,p.exports,t),p.exports})(85).print("Hello, world!")})();
```

### 附录

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

- [webpack 中文官方文档](https://webpack.docschina.org/concepts/)
