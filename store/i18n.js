export const state = () => ({
  locales: ['zh-CN', 'en-US'],
  locale: 'zh-CN'
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    } else {
      state.locale = 'zh-CN'
    }
  }
}
