const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  devServer: {
    static: "./"
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js",
  },
module: {
    rules: [
      {
        //regex expression for img extension of .jpg
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath: function(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Food Festival",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      //short_url is the PWA homepage
      short_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 256, 384, 512],
        //where do we want to send the icons?
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: "development",
};
