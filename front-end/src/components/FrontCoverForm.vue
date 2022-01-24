<template>
  <form id="front-cover-form" @submit="onSubmit">
    <div class="toolbar">
      <span class="text-muted">This is my header</span>
      <div>
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
  </form>
</template>

<script>
import Dropzone from './Dropzone.vue';
import { generatePdf } from '../api';

export default {
  name: 'FrontCoverForm',
  components: {
    Dropzone,
  },
  data() {
    return {
      frontText: '',
      dateText: '',
      backText: '',
      images: {},
    }
  },
  methods: {
    async onSave(e) {
      e.preventDefault();
      console.log('save');
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

      await generatePdf(this.frontText, this.dateText, this.images);
    }
  },
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
.toolbar span {
  flex: 1;
}
.toolbar button, input {
  margin-right: 10px;
}
</style>
