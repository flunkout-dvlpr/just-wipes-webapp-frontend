import { Auth } from 'aws-amplify'

export async function signIn ({ commit }, payload) {
  var username = `+1${payload}`
  return Auth.signIn(username).then((response) => {
    console.log(response)
    return response
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

export async function confirmSignIn ({ state, commit }, payload) {
  return Auth.sendCustomChallengeAnswer(payload.cognitoUser, payload.otp).then((response) => {
    if (response.authenticationFlowType === 'CUSTOM_AUTH') {
      console.log('Incorrect Code, Please Try Again!')
      this._vm.$q.notify({
        color: 'warning',
        textColor: 'grey-9',
        icon: 'error',
        message: 'Incorrect Code, Please Try Again!'
      })
    } else if (response.authenticationFlowType === 'USER_SRP_AUTH') {
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
    this.$router.push({ path: '/' })
  })
}
