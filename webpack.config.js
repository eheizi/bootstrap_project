const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry:"./src/main.js",
    output:{
        //输出路径
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
        clean: true, // 自动将上次打包目录资源清空
    },
    // 加载器
  module: {
    rules: [
        {
            test:/\.css$/,
            use:[MiniCssExtractPlugin.loader,"css-loader",]
        },
        {
            test:/\.less$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
        },
        {
          test: /\.s[ac]ss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                  maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
                }
              },
              generator: {
                // 将图片文件输出到 static/imgs 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数
                filename: "static/imgs/[hash:8][ext][query]",
              },
          },
          {
            test: /\.(ttf|woff2?|map4|map3|avi)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            loader: "babel-loader",
          },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
        // 以 public/index.html 为模板创建文件
        // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
        template: path.resolve(__dirname, "public/index.html"),
      }),
      // 提取css成单独文件
    new MiniCssExtractPlugin({
        // 定义输出文件名和目录
        filename: "static/css/main.css",
      }),
         // css压缩
    new CssMinimizerPlugin(),
  ],
   // 开发服务器
   devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  // 模式
  mode: "development", // 开发模式

}