<template>
  <div id="dropzone" v-bind="getRootProps()">
    <div v-if="!previewSrc" id="file-upload">
      <input v-bind="getInputProps()" />
      <p>Drag and drop the image here, or click to select files</p>
    </div>
    <div v-else id="preview">
      <img v-bind:src="previewSrc" />
      <button type="button" class="btn icon-button" @click="clearImagePreview">
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { useDropzone } from 'vue3-dropzone';
import { mapState } from 'vuex';

export default {
  name: 'Dropzone',
  props: {
    name: String,
    pageName: String,
  },
  data() {
    return {
      getRootProps: () => {},
      getInputProps: () => {},
    }
  },
  computed: {
    ...mapState({
      previewSrc: function(state) {
        return state.pages.find(page => page.pageName === this.pageName).imagePreviews[this.name];
      }
    })
  },
  created() {
    const { getRootProps, getInputProps, ...rest } = useDropzone({ onDrop: this.onDrop })
    this.getRootProps = getRootProps;
    this.getInputProps = getInputProps;
  },
  methods: {
    onDrop(acceptFiles, rejectReasons) {
      const reader = new FileReader();
      const self = this;
      reader.addEventListener('load', function () {
        self.setImagePreview(reader.result);
      }, false);
      reader.readAsDataURL(acceptFiles[0]);
      this.$emit('set-image-src', acceptFiles[0], this.name);
    },
    setImagePreview(imageSrc) {
      this.$store.commit('setImagePreview', { pageName: this.pageName, name: this.name, src: imageSrc });
    },
    clearImagePreview(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$store.commit('setImagePreview', { pageName: this.pageName, name: this.name });
      this.$emit('set-image-src', undefined, this.name);
    },
  }
}
</script>

<style scoped>
#dropzone {
  border: 2px dashed rgb(211,211,211);
  height: 150px;
  width: 100%;
  border-radius: 5px;
}

#file-upload {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#file-upload p {
  margin: 0;
}

#preview {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  position: absolute;
  max-width: 80%;
  max-height: 140px;
  width: auto;
  height: auto;
}
#preview button {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>