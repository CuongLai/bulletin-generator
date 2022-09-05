<template>
  <div id="pdf-builder" class="h-100">
    <div v-if="layout">
      <button @click="toggleShowLayouts" class="btn mb-2" :disabled="pageConfig.lockLayout">Change Layout</button>
      <div v-for="(element, i) in layout.elements" :key="i" class="mb-3">
        <div v-if="element === 'text'">
          <textarea
            :name="pageConfig.pageName + 'Text'"
            :value="pageData.text[pageConfig.pageName + i]"
            @input="event => setText(event.target.value, i)"
            class="form-control"
            rows="4"
          />
        </div>

        <div v-else-if="element === 'image'">
          <Dropzone @set-image-src="setImage" :name="pageConfig.pageName + i" :pageName="pageConfig.pageName" />
        </div>
      </div>
    </div>
    <div v-else class="no-layout">
      <div class="d-flex flex-column align-items-center justify-content-center">
        Blank page
        <button @click="toggleShowLayouts" class="btn mt-2">Choose Layout</button>
      </div>
    </div>
  </div>

  <Modal v-model="showLayouts" :showFooter="true" @confirm="initialize" @cancel="(close) => close()" id="layouts">
    <template v-slot:title>Layouts</template>
    <div class="form-check">
      <div v-for="layout in layouts" :key="layout.name">
        <input class="form-check-input" type="radio" name="layout" :id="layout.name" :value="layout.name" v-model="selectedLayout">
        <label class="form-check-label" :for="layout.name">
          {{layout.description}}
        </label>
      </div>
    </div>
  </Modal>
</template>

<script>
import Dropzone from '../components/Dropzone';
import Modal from '../components/Modal';
import { layouts } from '../services/config';

export default {
  name: 'PdfBuilder',
  components: {
    Dropzone,
    Modal,
  },
  props: {
    pageConfig: Object,
  },
  data() {
    return {
      pageData: undefined,
      layout: undefined,
      showLayouts: false,
      layouts,
      selectedLayout: undefined,
    };
  },
  created() {
    const { pageName, layoutName, cover, side } = this.pageConfig;
    this.$store.commit('setPageDefaults', { pageName, layoutName, cover, side });
    this.pageData = this.$store.state.pages.find(page => page.pageName === pageName);
    this.layout = layouts.find(l => l.name === this.pageData.layoutName);
  },
  methods: {
    toggleShowLayouts(e) {
      e.preventDefault();
      this.showLayouts = !this.showLayouts;
    },
    initialize(closeModal) {
      this.$store.commit('setLayoutName', { pageName: this.pageConfig.pageName, layoutName: this.selectedLayout })
      this.layout = layouts.find(l => l.name === this.selectedLayout);
      closeModal();
    },
    async onSave(e) {
      e.preventDefault();
    },
    async setImage(file, name) {
      this.$store.commit('setImageFile', { pageName: this.pageConfig.pageName, name, file });
    },
    setText(text, iterator) {
      this.$store.commit('setText', {
        pageName: this.pageConfig.pageName,
        name: this.pageConfig.pageName + iterator,
        text,
      });
    },
  },
}
</script>

<style scoped>
.no-layout {
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #e0e0e0;
}
</style>
