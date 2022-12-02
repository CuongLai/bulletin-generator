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
      if (!state.pages.find(page => page.pageName === pageName)) {
        state.pages.push({
          pageName,
          cover,
          side,
          layoutName,
          text: {},
          images: {},
          imagePreviews: {},
        });
      }
    },
    setLayoutName(state, { pageName, layoutName }) {
      state.pages.find(page => page.pageName === pageName).layoutName = layoutName;
    },
    setText (state, { pageName, name, text }) {
      if (text) {
        state.pages.find(page => page.pageName === pageName).text[name] = text;
      } else {
        delete state.pages.find(page => page.pageName === pageName).text[name];
      }
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