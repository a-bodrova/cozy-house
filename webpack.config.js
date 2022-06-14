const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: './src/js/index.js',
  // entry: {
  //   index: {
  //     import: './src/pages/main/index.js',
  //     dependOn: 'shared',
  //   },
  //   pets: {
  //     import: './src/pages/pets/pets.js',
  //     dependOn: 'shared',
  //   },
  //   shared: './src/js/index.js',
  // },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // optimization: {
  //   runtimeChunk: 'single',
  // },

  devServer: {
    open: true,
    host: 'localhost',
  },

  plugins: [
    new HtmlWebpackPlugin({
      // inject: true,
      // chunks: ['./src/js/index.js'],
      filename: './index.html',
      template: './src/pages/main/main.html',
    }),

    new HtmlWebpackPlugin({
      // inject: true,
      // chunks: ['./src/js/index.js'],
      filename: './pets.html',
      template: './src/pages/pets/pets.html',
    }),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets/images/', to: './assets/images/' },
        { from: './src/assets/icons/', to: './assets/icons/' },
      ],
    })

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(svg)$/i,
        type: 'asset',
        generator: {
          filename: './assets/icons/[hash][ext]',
        }
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset',
        generator: {
          filename: './assets/fonts/[hash][ext]',
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: './assets/images/[hash][ext]',
        }
      },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {

  if (isProduction) {
    config.mode = 'production';    
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }

  return config;
};
