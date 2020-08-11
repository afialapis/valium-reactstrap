const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: __dirname,
  entry: [
    './src/Demo.js'
  ],
  output: {
    path: __dirname,
    filename: 'dist/bundle.js',
    publicPath: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          __dirname,
          path.join(__dirname, '../src'),
          //path.join(__dirname, '../../valium/src')
        ],
        query: {
          cacheDirectory: false,
          presets: [
            ['@babel/preset-env', {targets: {esmodules: true}}],
            '@babel/preset-react'],
          plugins: [
            // Stage 3
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-object-rest-spread',
            // ["module:fast-async"]
          ]
        }        
      },
      {
        test: /\.(css|scss)(\?.+)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },       
    ]
  } ,
  plugins: [
    //new BundleAnalyzerPlugin({reportFileName: 'webpack_report.html'}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'dist/bundle.css',
      allChunks: true
    }), 
  ]  
};
