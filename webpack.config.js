const path = require('path');

module.exports = {
  entry: './src/tsm.ts',
  devtool: 'inline-source-map',
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
    library: 'tsm',
    filename: 'tsm.js',
    path: path.resolve(__dirname, 'dist')
  }
};