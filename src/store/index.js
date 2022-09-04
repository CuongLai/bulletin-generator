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
    setPageDefaults (state, { pageName, layoutName, cover, side }) {
      state.pages.push({
        pageName,
        cover,
        side,
        layoutName,
        text: {},
        images: {},
        imagePreviews: {},
      });
    },
    setText (state, { pageName, name, text }) {
      state.pages.find(page => page.pageName === pageName).text[name] = text;
    },
    setImageFile (state, { pageName, name, file }) {
      if (file) {
        state.pages.find(page => page.pageName === pageName).images[name] = file;
      } else {
        delete state.pages.find(page => page.pageName === pageName).images[name];
      }
    },
    setImagePreview (state, { pageName, name, src }) {
      if (src) {
        state.pages.find(page => page.pageName === pageName).imagePreviews[name] = src;
      } else {
        delete state.pages.find(page => page.pageName === pageName).imagePreviews[name];
      }
    },
  }
})

export default store