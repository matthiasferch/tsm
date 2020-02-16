const path = require('path');

module.exports = {
  entry: './src/ts-matrix.ts',
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  output: {
    library: 'tsmatrix',
    libraryTarget: 'umd',
    filename: 'tsmatrix.js',
    path: path.resolve(__dirname, 'dist')
  }
};