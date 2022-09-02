<template>
  <div class="editor">
    <Toolbar @form-submit="onSubmit" />

    <PdfBuilder @set-image="setImage" />

    <Modal v-model="showPreview" :showFooter="false" id="preview">
      <template v-slot:title>Preview</template>
      <template v-slot:toolbar-buttons>
        <a
          :href="pdfPreview"
          :download="`bia bao ${new Date().getMonth() + 1}-${new Date().getFullYear()}`"
          id="download-button"
          class="btn icon-button d-flex justify-content-center align-items-center"
        >
          <i class="fas fa-download"></i>
        </a>
      </template>
      <PdfViewer v-if="pdfPreview" :pdfSrc="pdfPreview" />
    </Modal>
  </div>
</template>

<script>
// @ is an alias to /src
import PdfBuilder from '@/containers/PdfBuilder.vue'
import Toolbar from '@/components/Toolbar.vue'
import Modal from '../components/Modal';
import PdfViewer from '../components/PdfViewer';
import isDarkColor from 'is-dark-color';

import { generatePdf } from '../services/api';
import { Project } from '../services/project';
import { layouts } from '../services/config';

export default {
  name: 'Editor',
  components: {
    Modal,
    PdfBuilder,
    PdfViewer,
    Toolbar,
  },
  data() {
    return {
      outerCoverData: {},
      innerCoverData: {},
      showPreview: false,
      pdfPreview: undefined,
      images: {},
    };
  },
  methods: {
    async togglePreview(e) {
      e.preventDefault();
      this.showPreview = !this.showPreview;
    },
    setOuterCoverData(data) {
      this.outerCoverData = data;
    },
    setInnerCoverData(data) {
      this.innerCoverData = data;
    },
    getTextColor(themeColor) {
      return isDarkColor(themeColor) ? 'ffffff' : '000000';
    },
    async setImage(file, name) {
      if (file) {
        this.images[name] = file;
      } else {
        delete this.images[name];
      }
    },
    async onSubmit(themeColor) {
      console.log(this.images['backImage1']);
      const textColor = this.getTextColor(themeColor);
      const project = new Project(themeColor.substring(1), layouts.captionWithThreeImages);
      const { frontText, dateText, backText } = this.$store.state;
      console.log(frontText);

      const sections = [
        ...project.buildFrontPageSections(frontText, dateText, textColor, this.images),
        project.buildTextSection(backText, 'left', '000000'),
        project.buildImageSection(this.images['backImage1'], 'left'),
        project.buildImageSection(this.images['backImage2'], 'left'),
        project.buildImageSection(this.images['backImage3'], 'left'),
      ];

      this.pdfPreview = undefined;
      const arrayBuffer = await generatePdf(sections);
      this.pdfPreview = URL.createObjectURL(new Blob([arrayBuffer], {
        type: "application/pdf"
      }));
      this.showPreview = true;
    },
  }
}
</script>

<style scoped>
::v-deep(#preview .v-modal) {
  padding: 0;
  width: 100%;
  height: 100%;
}
::v-deep(#preview .v-modal-title) {
  padding: 1rem;
}
::v-deep(#preview .v-modal-content) {
  height: 100%;
  background-color: lightgray;
}
</style>