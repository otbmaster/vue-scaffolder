import Axios from "axios";

const actions = {
    update ({ commit }) {
        console.log('action update')
        commit('UPDATE')
    }
}
export default actions