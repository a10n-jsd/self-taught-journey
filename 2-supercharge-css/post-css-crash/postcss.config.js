module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      stage: 1, // 0: cutting edge. Default: 2
    }),
    require('postcss-simple-vars'),
    require('postcss-import'),
    // require('cssnano')({
    //   preset: 'default',
    // })
  ]
}