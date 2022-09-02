import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      frontText: 'fronttext',
      dateText: 'datetext',
      backText: 'backtext',
    }
  },
  mutations: {
    setFrontText (state, text) {
      state.frontText = text
    },
    setDateText (state, text) {
      state.dateText = text
    },
    setBackText (state, text) {
      state.backText = text
    },
  }
})

export default store