import Vue from 'vue'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView, {
  i18n: function (path, options) {
    let value = this.$t(path, options)
    if (value !== null && value !== undefined) return value

    return ''
  }
})
