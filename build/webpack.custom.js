var path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  resolve: {
    alias: {
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'sass': resolve('src/assets/sass'),
      'base': resolve('src/assets/sass/base'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: []
  }
}

var esLintRule = {
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
}

if(process.env.ENABLE_ESLINT && process.env.ENABLE_ESLINT === 'true'){
  webpackConfig.module.rules.unshift(esLintRule) //add eslint
}

module.exports = webpackConfig
