/* eslint-disable import/order */
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Automatically clean up the output folder
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          "thread-loader", // Enable parallel processing
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              cacheDirectory: true, // Enable caching
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "thread-loader", // Enable parallel processing for CSS
          MiniCssExtractPlugin.loader,
          "css-loader",
          "cache-loader", // Enable caching for CSS
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean up the dist folder before each build
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // Template name for the output CSS files
    }),
    new CompressionWebpackPlugin({
      algorithm: "gzip",
      test: /\.(js|css)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    ...(process.env.ANALYZE === "true"
      ? [new BundleAnalyzerPlugin({ analyzerPort: 1000 })]
      : []), // Conditionally include BundleAnalyzerPlugin
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // Enable parallel builds
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: true, // Enable parallel CSS minimization
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  cache: {
    type: "filesystem", // Enable persistent caching
    cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // Specify cache directory
  },
});
