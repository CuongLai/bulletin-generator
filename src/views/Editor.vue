<template>
  <div class="editor">
    <Toolbar @form-submit="onSubmit" />

    <div class="row container m-auto">
      <div class="col-6">
        <PdfBuilder layoutName="oneCaptionThreeImages" pageName="Back" :pageNumber="2" />
      </div>
      <div class="col-6">
        <PdfBuilder layoutName="frontPage" pageName="Front" :pageNumber="1" />
      </div>
    </div>

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

import { generatePdf } from '../services/api';
import { Page } from '../services/page';

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
      showPreview: false,
      pdfPreview: undefined,
    };
  },
  methods: {
    async togglePreview(e) {
      e.preventDefault();
      this.showPreview = !this.showPreview;
    },
    async onSubmit(themeColor) {
      const { pages } = this.$store.state;
      pages.sort((a, b) => a.pageNumber - b.pageNumber);

      let sections = [];

      for (const pageData of pages) {
        const page = new Page(themeColor.substring(1), pageData.layoutName);
        if (pageData.layoutName === 'frontPage') {
          sections = [...sections, ...page.buildFrontPageSections(pageData)];
        } else {
          for (let i = 0; i < page.layout.elements.length; i++) {
            const element = page.layout.elements[i];
            if (element === 'text') {
              sections.push(page.buildTextSection(pageData.text[pageData.pageName + i], 'left', '000000'));
            } else if (element === 'image') {
              sections.push(page.buildImageSection(pageData.images[pageData.pageName + i], 'left'));
            }
          }
        }
      }

      this.pdfPreview = undefined;
      const arrayBuffer = await generatePdf(sections);
      this.pdfPreview = URL.createObjectURL(new Blob([arrayBuffer], {
        type: "application/pdf"
      }));
      this.showPreview = true;
    },
  },
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