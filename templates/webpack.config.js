const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const CSS_SCOPE_NAME = "[name][hash:base64:5]__[local]___[hash:base64:5]"


module.exports = env => {
  const cssOutputName = (env == 'production') ?
    '[name].[chunkhash].css' : '[name].dev.css'
  const outputPath = path.resolve(__dirname, './dist/' + env + '/')

  const extractLess = new ExtractTextPlugin({
      filename: cssOutputName,
      allChunks: true,
  })

  const extractThirdParty = new ExtractTextPlugin({
    filename: '[name].third-party.dev.css',
    allChunks: true,
  })

  const moduleRules = [
    // pass these files through babel to transpile them
    {
      test: /\.js$/,
      exclude: /.*(node_modules|dist)\/.*/i,
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              'env',
              'react',
            ],
            plugins: [
              ['react-css-modules', {
                webpackHotModuleReloading: true,
                generateScopedName: CSS_SCOPE_NAME,
              }]
            ]
          }
        }
      ]
    },
    {
      test: /.*.css$/gi,
      use: extractLess.extract({
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 3,
              localIdentName: CSS_SCOPE_NAME,
              url: false,
              minimize: env == 'production',
              sourceMap: env != 'production',
            }
          },
        ],
        fallback: 'style-loader',
      })
    },

    {
      test: /\.less$/,
      use: extractLess.extract({
        use: [
          {
              loader: "css-loader",
              options: {
                url: false,
                minimize: env == 'production',
                sourceMap: env != 'production',
              }
          },
          {
              loader: "less-loader",
              options: {
                  strictMath: false,
                  noIeCompat: true,
                  relativeUrls: false,
                  rootpath: '/',
                  minimize: env == 'production',
                  sourceMap: env != 'production',
              }
          }
        ],
        fallback: 'style-loader'
      })
    },

    // pass urls through the url loader
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.json$/,
        /\.svg$/,
        /\.less$/,
        /\.(scss|sass)$/,
      ],
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },
    // compile font files into the build
    {
      test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.woff$/,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: '/{{projectSlug}}/dist/dev/',
        },
      }]
    },
  ]

  return {
    entry: {
      main: 'main.js',
    },

    output: {
      // output filename template
      filename: '[name].dev.js',
      // output file chunks name template
      chunkFilename: '[name].[id].dev.js',
      // path to output files to
      path: path.resolve(__dirname, './dist/dev'),
      // url resolution path for assets
      publicPath: '/{{projectSlug}}/dist/dev/',
    },

    // development tool for debugging to build into output
    devtool: 'cheap-eval-source-map',

    // rules for compiling modules
    module: {
      rules: moduleRules
    },

    resolve: {
      // where source can lookup namespaces from
      modules: [path.resolve(__dirname, 'lib'), './node_modules',],
    },

    externals: {
      cheerio: 'window',
    },

    // plugins to run in the build composition
    plugins: [
      // clean the directory before putting new things into it
      new CleanWebpackPlugin(
        [path.resolve(__dirname, './dist/dev')],
        {
          root: path.resolve(__dirname, '.'),
        }
      ),
      extractThirdParty,
      extractLess,
      // shake the trees and extract common components to a common file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common' // Specify the common bundle's name.
      }),
      // define environment variable
      new webpack.DefinePlugin({environment: 'development'}),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
  }
}
