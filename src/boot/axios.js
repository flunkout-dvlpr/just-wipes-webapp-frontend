import Vue from 'vue'
import axios from 'axios'

if (process.env.PROD) {
  axios.defaults.baseURL = 'https://e3e5i8pm20.execute-api.us-east-2.amazonaws.com/Prod'
} else {
  axios.defaults.baseURL = 'http://localhost:3000/'
}
export default function ({ store }) {
  console.log(store.state.user.token)
  axios.defaults.headers.common.Authorization = `Bearer ${store.state.user.token}`
}
Vue.prototype.$axios = axios
