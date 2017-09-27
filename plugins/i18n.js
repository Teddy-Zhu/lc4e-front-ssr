import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({isClient, app, store, route, error, redirect}) => {
  Vue.config.lang = store.state.i18n.locale
  Vue.config.fallbackLang = 'zh-CN'
  app.i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'zh-CN',
    messages: {
      'en-US': require('~/locales/en-US.json'),
      'zh-CN': require('~/locales/zh-CN.json')
    }
  })
}
