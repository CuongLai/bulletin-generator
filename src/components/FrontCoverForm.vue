<template>
  <form @submit="onSubmit">
    <div class="toolbar">
      <span class="text-muted">This is my header</span>
      <div>
        <button
          @click="togglePreview"
          type="button" class="btn btn-primary">Preview</button>
                  <!-- <button
          @click="togglePreview"
          :disabled="!pdfPreview"
          type="button" class="btn btn-primary">Preview</button> -->
        <button @click="onSave" type="button" class="btn btn-primary">Save</button>
        <input type="submit" class="btn btn-primary" />
      </div>
    </div>
    <div class="row container m-auto">
      <div class="col-6">
        <label for="backText" class="form-label">Back text</label>
        <textarea name="backText" v-model="backText" class="form-control" rows="4" />

        <label class="form-label">Back Image 1</label>
        <Dropzone @set-image-src="setImage" name="backImage1" />

        <label class="form-label">Back Image 2</label>
        <Dropzone @set-image-src="setImage" name="backImage2" />

        <label class="form-label">Back Image 3</label>
        <Dropzone @set-image-src="setImage" name="backImage3" />
      </div>
      <div class="col-6">
        <label class="form-label">Logo</label>
        <Dropzone @set-image-src="setImage" name="logo" />

        <label for="dateText" class="form-label">Date text</label>
        <input type="text" name="dateText" v-model="dateText" class="form-control" />

        <label class="form-label">Front Image</label>
        <Dropzone @set-image-src="setImage" name="frontImage" />

        <label for="frontText" class="form-label">Front text</label>
        <textarea name="frontText" class="form-control" rows="4" v-model="frontText" />
      </div>
    </div>
    
    <Modal v-model="showPreview" @confirm="confirm" @cancel="cancel" showFooter="false" id="preview">
      <template v-slot:title>Preview</template>
      <embed id="pdfviewer" v-if="pdfPreview && showPreview" :src="pdfPreview" type="application/pdf" />
    </Modal>
  </form>
</template>

<script>
import Dropzone from './Dropzone.vue';
import Modal from './Modal';
import { generatePdf } from '../services/api';

export default {
  name: 'FrontCoverForm',
  components: {
    Dropzone,
    Modal,
  },
  data() {
    return {
      frontText: '',
      dateText: '',
      backText: '',
      images: {},
      pdfPreview: undefined,
      showPreview: false,
    }
  },
  methods: {
    async togglePreview(e) {
      e.preventDefault();
      this.showPreview = !this.showPreview;
    },
    async onSave(e) {
      e.preventDefault();
      console.log('save');
    },
    confirm(close) {
      close();
    },
    cancel(close) {
      close();
    },
    async setImage(file, name) {
      if (file) {
        this.images[name] = file;
      } else {
        delete this.images[name];
      }
      console.log(this.images);
    },
    async onSubmit(e) {
      e.preventDefault();

      if (!this.frontText) {
        alert('Please enter front text');
        return;
      }

      if (!this.backText) {
        alert('Please enter backText text');
        return;
      }

      // TODO: images validation

      const arrayBuffer = await generatePdf(this.frontText, this.dateText, this.images);
      this.pdfPreview = URL.createObjectURL(new Blob([arrayBuffer], {
        type: "application/pdf"
      }));
      this.showPreview = true;
    }
  },
}
</script>

<style scoped>
main {
  position: relative;
}
#form {
  position: absolute;
  width: 100%;
}

::v-deep(#preview .v-modal) {
  width: 100%;
  padding: 0;
}
::v-deep(#preview .v-modal-title) {
  padding: 1rem;
}

embed {
  width: 100%;
  height: 80vh;
}

.toolbar {
  display: flex;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;
}
.toolbar span {
  flex: 1;
}
.toolbar button, input {
  margin-right: 10px;
}
</style>
