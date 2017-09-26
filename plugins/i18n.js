import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({isClient, app, store, route, error, redirect}) => {
  Vue.config.lang = store.state.i18n.locale
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'zh-CN',
    messages: {
      'zh-CN': require('~/locales/zh-CN.json'),
      'en-US': require('~/locales/en-US.json')
    }
  })
}
