const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        generator: [
          {
            // You can apply generator using `?as=webp`, you can use any name and provide more options
            preset: "webp",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              // Please specify only one plugin here, multiple plugins will not work
              plugins: ["imagemin-webp"],
            },
          },
        ],
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [["mozjpeg"], ["pngquant"]],
          },
        },
      }),
    ],
  },
  plugins: [
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "theseniordev",
      project: "the-movie-app",
    }),
  ],
});
