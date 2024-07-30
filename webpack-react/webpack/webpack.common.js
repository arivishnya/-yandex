const webpack = require("webpack"); // подключаем webpack для использования встроенного плагина EnvironmentPlugin
const path = require("path"); // для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
const HTMLWebpackPlugins = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// в зависимости от того, какой скрипт мы запустили
// переменная production получит либо false, либо true
const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"), // точка входа в наше приложение содержит абсолютный путь к index.ts
  output: {
    path: path.resolve(__dirname, "..", "./dist"), // путь, куда будет собираться наш проект
    filename: production
      ? "static/scripts/[name].[contenthash].js" // добавляем хеш к имени файла, если запускаем в режиме production
      : "static/scripts/[name].js", // имя нашего бандла
    // filename: "main.js", // имя нашего бандла
    publicPath: "/",
  },
  // Нужно помочь вебпаку научиться работать с jsx- и tsx-файлами, для этого используют ts-loader
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, //содержит регулярное выражение, которое содержит информацию, какие файлы должны обрабатываться этим loader'ом
        use: [
          {
            loader: "ts-loader",
          },
        ], // для того чтобы ts-loader корректно отработал, нам нужен tsconfig, его можно создать вручную, а можно создать автоматически
        /** чтобы проинициализировать его автоматически, можно установить пакет typesctipt глобально или использовать npx, выполнив команду npx tsc --init
                После создания конфига нужно включить "allowJs": true, чтобы работать не только c typescript, также меняем "jsx": "react", чтобы мы могли работать с react-компонентами, и включаем карту ресурсов "sourceMap": true, пока на этом все вернёмся в этот конфиг позже*/
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // в режиме production создаём физический файл в папке dist, в dev режиме добавляем стили в тег style в html-файле
          production ? MiniCssExtractPlugin.loader : "style-loader",
          ,
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]__[hash:base64:5]",
                auto: /\.module\.\w+$/i,
                // namedExport: false,
              },
              importLoaders: 2, // значение 2 говорит о том, что некоторые трансформации PostCSS нужно применить до css-loader.
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"], // указываем файлы, с которыми будет работать webpack
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, "..", "./public/index.html"),
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "static/styles/index.css",
    // }),
    new MiniCssExtractPlugin({
      filename: "static/styles/[name].[contenthash].css",
    }),
    // плагин позволяет установить переменные окружения, можно переопределить переменную из блока script файла package.json
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // значение по умолчанию 'development', если переменная process.env.NODE_ENV не передана при вызове сборки
    }),
  ],
};
