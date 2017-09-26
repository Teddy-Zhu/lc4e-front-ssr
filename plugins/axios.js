import axios from 'axios'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

const apiBaseUrl = 'https://api.silentgo.com'
let ajax = axios.create({
  baseURL: apiBaseUrl,
  browserBaseURL: apiBaseUrl,
  timeout: 30000,
  // transformRequest: [function (data) {
  //     let ret = '', index = 0;
  //     for (let it in data) {
  //         index++;
  //         ret += (index == 1 ? '' : '&') + encodeURIComponent(it) + '=' + encodeURIComponent(data[it])
  //     }
  //     return ret
  // }],
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

ajax.interceptors.request.use(function (config) {
  // NProgress.start()
  return config
}, function (error) {
  return Promise.reject(error)
})

ajax.interceptors.response.use(res => {
  // NProgress.done()
  return res
}, error => {
  // NProgress.done()
  return Promise.reject(error)
})

export default ajax
