import { Auth } from 'aws-amplify'

export async function signUp ({ dispatch }, payload) {
  var username = `+1${payload.phone}`
  return await Auth.signUp({
    username: username,
    password: '12345678',
    attributes: {
      phone_number: username,
      name: payload.name
    }
  }).then((response) => {
    if (response.userConfirmed) {
      dispatch('user/signIn', payload.phone, { root: true })
    }
  }).catch((error) => {
    if (error.code === 'UsernameExistsException') {
      error.message = 'This user already exists, please Sign In!'
    }
    this._vm.$q.notify({
      color: 'warning',
      textColor: 'grey-9',
      icon: 'error',
      message: error.message
    })
    this.$router.push({ name: 'SignIn' })
  })
}

export async function signIn ({ commit }, payload) {
  var username = `+1${payload}`
  return await Auth.signIn(username).then((response) => {
    if (response.challengeName === 'CUSTOM_CHALLENGE') {
      this.$router.push({ name: 'Verify', params: { cognitoUser: response } })
    }
  }).catch((error) => {
    if (error.code === 'UserLambdaValidationException') {
      error.message = 'User Does Not Exist, Please Sign Up!'
    }
    this._vm.$q.notify({
      color: 'warning',
      textColor: 'grey-9',
      icon: 'error',
      message: error.message
    })
  })
}

export async function confirmSignIn ({ commit }, payload) {
  return await Auth.sendCustomChallengeAnswer(payload.cognitoUser, payload.otp).then((response) => {
    if (response.authenticationFlowType === 'CUSTOM_AUTH') {
      this._vm.$q.notify({
        color: 'warning',
        textColor: 'grey-9',
        icon: 'error',
        message: 'Incorrect Code, Please Try Again!'
      })
      return false
    } else if (response.authenticationFlowType === 'USER_SRP_AUTH') {
      var token = response.signInUserSession.idToken.jwtToken
      this._vm.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      commit('setUser', response)
      commit('setToken', token)
      this.$router.push({ name: 'Home' })
      return true
    }
  }).catch((error) => {
    if (error.code === 'UserLambdaValidationException') {
      error.message = 'Attempts Exceeded, Please Sign In Again!'
    }
    this._vm.$q.notify({
      color: 'negative',
      textColor: 'grey-3',
      icon: 'error',
      message: error.message
    })
    this.$router.push({ name: 'SignIn' })
  })
}

export async function signOut ({ commit }) {
  await Auth.signOut()
  commit('resetState')
}

export function loadUserData ({ commit, state }) {
  var payload = { name: state.user.attributes.name, phone_number: state.user.attributes.phone_number }
  return this._vm.$axios.post('data/get-by-phone', payload).then((response) => {
    if (response.data.type === 'success') {
      commit('setData', response.data.payload)
    } else {
      var options = [{ type: 'success', color: 'positive', icon: 'save' },
        { type: 'warning ', color: 'warning', icon: 'warning' },
        { type: 'error', color: 'negative', icon: 'error' }]
      var notifyType = options.find(option => option.type === response.data.type)
      this._vm.$q.notify({
        color: notifyType.color,
        textColor: 'grey-2',
        icon: notifyType.icon
      })
    }
  })
}

export function addPurchase ({ commit, state }, payload) {
  var body = { phone_number: state.user.attributes.phone_number, purchase: payload }
  return this._vm.$axios.post('data/add-by-phone', body).then((response) => {
    if (response.data.type === 'success') {
      commit('setData', response.data.payload)
    }
    var options = [{ type: 'success', color: 'positive', icon: 'save' },
      { type: 'warning', color: 'warning', icon: 'warning' },
      { type: 'error', color: 'negative', icon: 'error' }]
    var notifyType = options.find(option => option.type === response.data.type)
    this._vm.$q.notify({
      color: notifyType.color,
      textColor: 'grey-2',
      icon: notifyType.icon,
      message: response.data.message
    })
  })
}
