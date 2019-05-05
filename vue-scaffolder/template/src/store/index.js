import Vue from 'vue'
import Vuex from 'vuex'
import about from './about'

Vue.use(Vuex)

const store = new Vuex.Store({
    states: {
      testB: "Test B"
    },
    actions: {
      updateA() {
        console.log('unpateA')
      }
    },
    modules: {
      about
    }
})

export default store