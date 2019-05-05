let CopyWebpackPlugin = require("copy-webpack-plugin");
let ZipPlugin = require("zip-webpack-plugin");
let path = require("path");
let pageInfo = require("./CubeModule.json");
let webpack = require('webpack');

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getZipName(type) {
    let d = new Date();
    let year = d.getFullYear();
    let month = checkTime(d.getMonth() + 1);
    let day = checkTime(d.getDate());
    let hour = checkTime(d.getHours());
    let minute = checkTime(d.getMinutes());
    let modes = ['', '-test', '-pro', '-sit']
    return pageInfo.name + '-' + pageInfo.version + modes[type] + '-' + year + month + day + hour + minute + '.zip';
}

const config = {
    // 本地打包配置
    development: {
        
    },
    // 测试打包配置
    test: {
        baseUrl: './',
        assetsDir: 'static',
        css: {
            modules: true,
            extract: true,
            sourceMap: true
        },
        configureWebpack: config => {
            /*把dist的文件进行打压缩包处理*/
            return {
                plugins: [
                    new webpack.ProvidePlugin({
                        ENVConfig: path.join(__dirname, './src/config/test.config')
                    }),
                    // 复制 CubeModule.json
                    new CopyWebpackPlugin([
                        { from: path.join(__dirname, './CubeModule.json'), to: path.join(__dirname, './dist/CubeModule.json') },
                    ]),
                    // 打压缩包
                    new ZipPlugin({
                        path: path.join(__dirname, './'),
                        filename: getZipName(1)
                    })
                ]
            }
        },
        chainWebpack: (webpackConfig) => {
            /*设置静态文件夹路径*/
            webpackConfig.resolve
                .alias
                .set('assets',  path.join(__dirname, './src/assets'));
            /*执行buildTest打包时添加webpack一些处理*/
            webpackConfig
                .mode('production')  // buildTest 用webpack 的 production 模式打包
                .devtool('source-map') // 添加 source-map
                .output
                .filename('static/js/[name].[contenthash:8].js') // 输出文件名字及位置
                .chunkFilename('static/js/[name].[contenthash:8].js');
    
            // keep module.id stable when vendor modules does not change
            // 模块代码没修改对应模块文件hash缓存
            webpackConfig
                .plugin('hash-module-ids')
                .use(require('webpack/lib/HashedModuleIdsPlugin'), [{
                    hashDigest: 'hex'
                }])
                // 压缩css
                .use(require('@intervolga/optimize-cssnano-plugin'), [{
                    sourceMap: true,
                    preset: ['default', {
                        mergeLonghand: false,
                        cssDeclarationSorter: false
                    }]
                }])
        }
    },
    // 生产打包配置
    production: {
        baseUrl: './',
        assetsDir: 'static',
        configureWebpack: config => {
            /* 把dist的文件进行打压缩包处理*/
            return {
                plugins: [
                    new webpack.ProvidePlugin({
                        ENVConfig:  path.join(__dirname, './src/config/prod.config')
                    }),
                    // 复制 CubeModule.json
                    new CopyWebpackPlugin([
                        { from: path.join(__dirname, './CubeModule.json'), to: path.join(__dirname, './dist/CubeModule.json') },
                    ]),
                    // 打压缩包
                    new ZipPlugin({
                        path: path.join(__dirname, './'),
                        filename: getZipName(2)
                    })
                ]
            }
        },
        chainWebpack: (webpackConfig) => {
            /*设置静态文件夹路径*/
            webpackConfig.resolve
                .alias
                .set('assets',  path.join(__dirname, './src/assets'));
        }
    }
}

/*
* npm run serve 命令process.env.NODE_ENV会赋值为development
* npm run buildTest 命令process.env.NODE_ENV会赋值为test
* npm run build 命令process.env.NODE_ENV会赋值为production
* */
module.exports = config[process.env.NODE_ENV];
