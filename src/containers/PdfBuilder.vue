<template>
  <div id="pdf-builder">
    <div class="row container m-auto">
      <div class="col-6">
        <label for="backText" class="form-label">Back text</label>
        <textarea name="backText" :value="backText" @input="updateBackText" class="form-control" rows="4" />

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
        <input type="text" name="dateText" :value="dateText" @input="updateDateText" class="form-control" />

        <label class="form-label">Front Image</label>
        <Dropzone @set-image-src="setImage" name="frontImage" />

        <label for="frontText" class="form-label">Front text</label>
        <textarea name="frontText" class="form-control" rows="4" :value="frontText" @input="updateFrontText" />
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from '../components/Dropzone';

import { mapState } from 'vuex';

export default {
  name: 'PdfBuilder',
  components: {
    Dropzone,
  },
  // data() {
  //   return {
  //     frontText: '',
  //     dateText: '',
  //     backText: '',
  //   }
  // },
  computed: {
    ...mapState({
      frontText: state => state.frontText,
      dateText: state => state.dateText,
      backText: state => state.backText,
    })
  },
  methods: {
    async onSave(e) {
      e.preventDefault();
    },
    async setImage(file, name) {
      this.$emit('set-image', file, name);
    },
    updateBackText(e) {
      this.$store.commit('setBackText', e.target.value);
    },
    updateFrontText(e) {
      this.$store.commit('setFrontText', e.target.value);
    },
    updateDateText(e) {
      this.$store.commit('setDateText', e.target.value);
    }
    // getTextColor(themeColor) {
    //   return isDarkColor(themeColor) ? 'ffffff' : '000000';
    // },
    // async onSubmit(themeColor) {
    //   if (!this.frontText) {
    //     alert('Please enter front text');
    //     return;
    //   }

    //   if (!this.backText) {
    //     alert('Please enter backText text');
    //     return;
    //   }

    //   // TODO: images validation
    //   const textColor = this.getTextColor(themeColor);
    //   const project = new Project(themeColor.substring(1), layouts.captionWithThreeImages);

    //   const sections = [
    //     ...project.buildFrontPageSections(this.frontText, this.dateText, textColor, this.images),
    //     project.buildTextSection(this.backText, 'left', '000000'),
    //     project.buildImageSection(this.images['backImage1'], 'left'),
    //     project.buildImageSection(this.images['backImage2'], 'left'),
    //     project.buildImageSection(this.images['backImage3'], 'left'),
    //   ];

    //   this.pdfPreview = undefined;
    //   const arrayBuffer = await generatePdf(sections);
    //   this.pdfPreview = URL.createObjectURL(new Blob([arrayBuffer], {
    //     type: "application/pdf"
    //   }));
    //   this.showPreview = true;
    // },
  },
}
</script>

<style scoped>

#download-button {
  color: black;
}
</style>
