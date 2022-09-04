<template>
  <div id="pdf-builder">
    <h3>{{pageName}} Page</h3>
    <div v-for="(element, i) in layout.elements" :key="i" class="mb-3">
      <div v-if="element === 'text'">
        <textarea
          :name="pageName + 'Text'"
          :value="text[pageName + i]"
          @input="event => setText(event.target.value, i)"
          class="form-control"
          rows="4"
        />
      </div>

      <div v-else-if="element === 'image'">
        <Dropzone @set-image-src="setImage" :name="pageName + i" />
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from '../components/Dropzone';
import { layouts } from '../services/config';

import { mapState } from 'vuex';

export default {
  name: 'PdfBuilder',
  components: {
    Dropzone,
  },
  props: {
    pageName: String,
    pageNumber: Number,
    layoutName: String,
  },
  data() {
    return {
      layout: layouts[this.layoutName],
    };
  },
  computed: {
    ...mapState({
      text: function(state) {
        console.log(this.pageName);
        
        return state.pages.find(page => page.pageName === this.pageName).text
      }
    })
  },
  created() {
    // TODO: move this to Editor
    this.$store.commit('setPageDefaults', { pageName: this.pageName, layoutName: this.layoutName, pageNumber: this.pageNumber })
  },
  methods: {
    async onSave(e) {
      e.preventDefault();
    },
    async setImage(file, name) {
      if (file) {
        this.$store.commit('setImage', { pageName: this.pageName, name, file });
      } else {
        this.$store.commit('removeImage', { pageName: this.pageName, name });
      }
    },
    setText(text, iterator) {
      this.$store.commit('setText', {
        pageName: this.pageName,
        name: this.pageName + iterator,
        text,
      });
    },
  },
}
</script>

<style scoped>

</style>
