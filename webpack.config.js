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
      library: "react-portal-hook",
      libraryTarget: "umd",
      globalObject: "this",
      umdNamedDefine: true
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: {
        react: path.resolve(__dirname, "./node_modules/react"),
        "react-dom": path.resolve(__dirname, "./node_modules/react-dom")
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/typescript", ["@babel/preset-env"]],
                plugins: [
                  "@babel/plugin-transform-runtime",
                  "@babel/plugin-proposal-optional-chaining"
                ]
              }
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
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "react-dom",
        root: "react-dom"
      }
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        formatter: "codeframe"
      })
    ]
  };
};
