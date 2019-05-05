import actions from './action'
import mutations from './mutation'
import getters from './getter'

const about = {
    namespaced: true,
    state: {
        testA: 'testQQQQ',
        count: 1
    },
    actions,
    mutations,
    getters
}

export default about
