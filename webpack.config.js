const path = require("path");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "index": path.resolve(__dirname, "src/index.ts"),
    "index.min": path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "LowCode",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        loader: "swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              dynamicImport: true,
              decorators: true,
              tsx: true,
            },
            loose: false,
            target: "es5",
            externalHelpers: false,
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
              react: {
                // automatic or classic
                // automatic会使用react17等新特性
                runtime: "classic",
                throwIfNamespace: true,
                useBuiltins: true,
                development: false,
              },
            },
          }
        }
      },
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: {},
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
};