/**
 * Created by teddyzhu on 2017/6/9.
 */

import util from '~/plugins/utils'
import Api from '~/plugins/api'

export const state = () => {
  return {}
}
export const mutations = {
  updateUser (state, user) {
    // sessionStorage.setItem('user', JSON.stringify(user))
    state.id = user.id
    state.nick = user.nick
  },
  removeUser (state) {
    // sessionStorage.removeItem('user')
    state.id = undefined
    state.nick = undefined
  }
}
export const actions = {
  login ({state, commit}, param) {
    util.ajax.post(Api.loginUrl, param.form).then(function (response) {
      if (response.data.result) {
        commit('updateUser', response.data.data.user)
      }
      param['callback'] && param.callback.call(this, response.data)
    }).catch(function (e) {

    })
  },
  logout ({commit}, callback) {
    util.ajax.post(Api.logoutUrl).then(function (response) {
      if (response.data.result) {
        commit('removeUser', {})
      }
      callback && callback.call(this, response.data)
    })
  }
}
