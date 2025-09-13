const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  plugins: [
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "theseniordev",
      project: "the-movie-app",
    }),
  ],
});
