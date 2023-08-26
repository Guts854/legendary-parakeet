import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';

// "./" 代表執行 node 指令時所在的資料夾之絕對路徑
// 跟 process.cwd() 一樣

// node 執行是由 package.json 的 npm 指令觸發
// 故 cwdPath 會是 package.json 所在的資料夾
// 也就是本專案根目錄(最外層)
const cwdPath = "./";

const getFullPath = (...paths: string[])=>{
  // 若在手動拚字串的過程中少了或多了一個 / 符號，
  // join 會自動修正並串接出路徑
  const joinedPath = path.join(...paths);

  // resolve 強制轉為絕對路徑
  // 因 webpack 不接受相對路徑
  const resolvePath = path.resolve(joinedPath);

  return resolvePath;
};

const config: webpack.Configuration = {
    mode: 'development',
    entry: getFullPath(cwdPath, "src", "main.ts"),
    output: {
      clean: true,
      path: getFullPath(cwdPath, 'dist'),
    },
    module:{
      rules: [
        {
          test: /\.m?(j|t)s$/,
          exclude: /(node_modules)/,
          use: {
            loader: "swc-loader"
          }
        }
      ]
    },
    plugins: [new HtmlWebpackPlugin({
      template: getFullPath(cwdPath, 'index.html'),
      title: "dev-mode"
    })],
};

export default config;