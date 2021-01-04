const {override, fixBabelImports, addLessLoader, addWebpackAlias} = require("customize-cra");
const path = require("path");

module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports("import", {
        libraryName: "caihrc",
        style: 'css', //自动打包相关的样式 默认为 style:'css'
    }),
    // 使用less-loader对源码重的less的变量进行重新制定
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            cssModules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]", // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
            },
        },
    }),
    //增加路径别名的处理
    addWebpackAlias({
        '@': path.resolve('./src')
    })
);
