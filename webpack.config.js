module.exports = {  
  entry: './src/app.ts',
  devtool: 'source-map',
  output: {
    filename: 'client/citizenhack.js',
    library: "CitizenHack",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
