const CompressionWebpackPlugin = require('compression-webpack-plugin')

console.log('process.env.NODE_ENV', process.env.NODE_ENV)

module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      lodash: '_',
      localforage: 'localforage',
      'element-ui': 'ELEMENT',
      axios: 'axios',
      'vue-router': 'VueRouter',
      jquery: '$',
    },
  },
}

if (process.env.NODE_ENV === 'production') {
  module.exports.configureWebpack.plugins = (module.exports.plugins || []).concat([
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ])
}
