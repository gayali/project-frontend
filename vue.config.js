const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  // configureWebpack: {
  //   //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
  //   resolve: {
  //      symlinks: false
  //   }
  // },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'ENVIRONMENT': JSON.stringify(process.env.NODE_ENV)
      })
    ],
    resolve: {
      symlinks: false
    }
  },
  transpileDependencies: [
    '@coreui/utils',
    '@coreui/vue'
  ]
}