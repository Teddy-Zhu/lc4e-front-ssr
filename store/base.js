/**
 * Created by teddyzhu on 2017/6/14.
 */

import ajax from '~/plugins/axios'
import Api from '~/plugins/api'

export const state = () => ({
  userImg: '',
  menus: [],
  siteName: '',
  version: ''
})

export const mutations = {
  updateBaseInfo (state, base) {
    state.userImg = base.userImg
    state.menus = JSON.parse(base.menusString)
    state.siteName = base.SiteName
    state.version = base.version
  }
}

export const actions = {
  pullBaseInfo ({state, commit, dispatch, rootState}, callback) {
    ajax.post(Api.baseInfoUrl)
      .then(function (response) {
        if (response.data.result) {
          console.log(rootState)
          commit('user/updateUser', response.data.data.user ? JSON.parse(response.data.data.user) : {}, {root: true})
          commit('updateBaseInfo', response.data.data)
        }
        callback && callback.call(this, response)
      })
  }
}
