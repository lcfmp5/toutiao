// const path = require ('path')
// const vantTheme =path.resolve(__dirname,"./src/styles/theme.less")
// module.exports = {
//     css: {
//       loaderOptions: {
//         less: {
//           // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
//           lessOptions: {
//             modifyVars: {
//               // 直接覆盖变量
//               'text-color': '#111',
//               'border-color': '#eee',
//               // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
//               hack: `true; @import "${vantTheme}";`,
//             },
//           },
//         },
//       },
//     },
// }

// function resolve (dir) {
//     return path.join(__dirname, dir)
//     //如已更换样式，引入的vant组件样式随之更改
// }
