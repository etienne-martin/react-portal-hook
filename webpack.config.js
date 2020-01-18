const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env, argv = {}) => {
  const isDev = argv.mode === "development";

  return {
    mode: "production",
    target: "web",
    entry: ["./src/index.ts"],
    output: {
      filename: "index.js",
      path: __dirname + "/dist",
      library: "react-hook-modal",
      libraryTarget: "umd",
      globalObject: "this",
      umdNamedDefine: true
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        react: path.resolve(__dirname, "./node_modules/react")
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader"
            },
            {
              loader: "eslint-loader",
              options: {
                emitWarning: true,
                emitError: !isDev
              }
            }
          ]
        }
      ]
    },
    externals: {
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      }
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        formatter: "codeframe"
      })
    ]
  };
};
