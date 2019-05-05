const getters = {
  testA (state, getters, rootState, rootGetters) {
    console.log(state)
    console.log(getters)
    console.log(rootState)
    console.log(rootGetters)
    return state.testA
  }
}
export default getters