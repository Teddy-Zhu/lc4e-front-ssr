module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Light Community',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'the light community with vuejs'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  plugins: [{
    src: '~plugins/i18n', injectAs: 'i18n'
  }, {src: '~plugins/iview', ssr: true}, '~plugins/utils'],
  build: {
    // 'nprogress',
    vendor: ['axios', 'vue-i18n', 'iview'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
