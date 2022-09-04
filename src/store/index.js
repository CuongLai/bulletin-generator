import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      pages: [],
    }
  },
  mutations: {
    resetForm (state) {
      state.pages = [];
    },
    setPageDefaults (state, { pageName, layoutName, pageNumber }) {
      state.pages.push({
        pageName,
        pageNumber,
        layoutName,
        text: {},
        images: {},
      });
    },
    setText (state, { pageName, name, text }) {
      state.pages.find(page => page.pageName === pageName).text[name] = text;
    },
    setImage (state, { pageName, name, file }) {
      state.pages.find(page => page.pageName === pageName).images[name] = file;
    },
    removeImage (state, { pageName, name }) {
      delete state.pages.find(page => page.pageName === pageName).images[name];
    }
  }
})

export default store