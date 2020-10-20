
export function setUser (state, payload) {
  state.user = payload
}

export function setToken (state, payload) {
  state.token = payload
}

export function setData (state, payload) {
  state.data = payload
}

export function resetState (state) {
  state.user = null
  state.token = null
  state.data = null
}
