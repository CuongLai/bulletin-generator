<template>
  <div id="pdf-builder">
    <div v-if="layout">
      <div v-for="(element, i) in layout.elements" :key="i" class="mb-3">
        <div v-if="element === 'text'">
          <textarea
            :name="pageName + 'Text'"
            :value="pageData.text[pageName + i]"
            @input="event => setText(event.target.value, i)"
            class="form-control"
            rows="4"
          />
        </div>

        <div v-else-if="element === 'image'">
          <Dropzone @set-image-src="setImage" :name="pageName + i" :pageName="pageName" />
        </div>
      </div>
    </div>
    <div v-else>
      No layout selected
      <button @click="initialize">do the thing</button>
    </div>
  </div>
</template>

<script>
import Dropzone from '../components/Dropzone';
import { layouts } from '../services/config';

export default {
  name: 'PdfBuilder',
  components: {
    Dropzone,
  },
  props: {
    pageName: String,
    layoutName: String,
    cover: String,
    side: String,
  },
  data() {
    return {
      pageData: undefined,
      layout: undefined,
    };
  },
  created() {
    this.$store.commit('setPageDefaults', { pageName: this.pageName, layoutName: this.layoutName, cover: this.cover, side: this.side });
    this.pageData = this.$store.state.pages.find(page => page.pageName === this.pageName);
    this.layout = layouts[this.pageData.layoutName];
  },
  methods: {
    initialize() {
      const layoutName = 'oneCaptionThreeImages';
      this.$store.commit('setLayoutName', { pageName: this.pageName, layoutName })
      this.layout = layouts[layoutName];
    },
    async onSave(e) {
      e.preventDefault();
    },
    async setImage(file, name) {
      this.$store.commit('setImageFile', { pageName: this.pageName, name, file });
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
