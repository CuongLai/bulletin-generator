<template>
  <form @submit="onSubmit">
    <div class="toolbar">
      <div class="flex-grow-1">
        <button type="button" class="btn btn-primary" @click="$router.push('/')">Back</button>
        <span class="text-muted">This is my header</span>
      </div>
      <div>
        <button
          type="button"
          id="color-picker-button"
          class="btn color-picker-button"
          @click="showColorPicker = !showColorPicker"
          :style="{ background: themeColor }"
        />
        <button
          type="button"
          class="btn icon-button"
          @click="showLayoutModal = true"
        >
          <i class="fa fa-th-large" />
        </button>
        <!-- <button
          @click="togglePreview"
          type="button" class="btn btn-primary">Preview</button> -->
                  <!-- <button
          @click="togglePreview"
          :disabled="!pdfPreview"
          type="button" class="btn btn-primary">Preview</button> -->
        <button
          type="button"
          @click="onSave"
          class="btn icon-button"
        >
          <i class="fas fa-save" />
        </button>
        <input type="submit" class="btn btn-primary" />
      </div>
    </div>

    <Modal v-model="showLayoutModal" :showFooter="true" id="layout">
      <template v-slot:title>Layout</template>
      <div>Option 1</div>
      <div>Option 2</div>
      <div>Option 3</div>
      <div>Option 4</div>
    </Modal>

    <ColorPicker
      v-if="showColorPicker"
      triggerId="color-picker-button"
      :defaultColor="themeColor"
      @on-change-color="updateThemeColor"
      @close-picker="showColorPicker = false"
    />
  </form>
</template>

<script>
import ColorPicker from '../components/ColorPicker';
import Modal from '../components/Modal';

export default {
  name: 'Toolbar',
  components: {
    ColorPicker,
    Modal,
  },
  data() {
    return {
      showColorPicker: false,
      showLayoutModal: false,
      themeColor: '#F47365',
    };
  },
  methods: {
    updateThemeColor(color) {
      this.themeColor = color;
    },
    onSave(e) {
      e.preventDefault();
    },
    onSubmit(e) {
      e.preventDefault();
      this.$emit('form-submit', this.themeColor);
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}
.toolbar button, input {
  margin-right: 10px;
}

.color-picker-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 0px 5px lightgray !important;
}
</style>