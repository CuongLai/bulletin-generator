<template>
  <div class="editor d-flex flex-column">
    <Toolbar @form-submit="onSubmit" />

    <div class="d-flex flex-grow-1 align-items-center mx-1">
      <button @click="() => displayedCover = 'outer'" :disabled="displayedCover === 'outer'" class="btn icon-button">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="flex-grow-1">
        <div v-if="displayedCover === 'outer'" class="container">
          <h2>Outside Cover</h2>
          <div class="row">
            <div class="col-6" v-for="page in outerPages" :key="page.pageName">
              <PdfBuilder :layoutName="page.layoutName" :pageName="page.pageName" />
            </div>
          </div>
        </div>

        <div v-else class="container">
          <h2>Inside Cover</h2>
          <div class="row">
            <div class="col-6" v-for="page in innerPages" :key="page.pageName">
              <PdfBuilder :layoutName="page.layoutName" :pageName="page.pageName" />
            </div>
          </div>
        </div>
      </div>

      <button @click="() => displayedCover = 'inner'" :disabled="displayedCover === 'inner'" class="btn icon-button">
        <i class="fas fa-chevron-right"></i>
      </button>
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
      displayedCover: 'outer',
      outerPages: [
        {
          pageName: 'backOuter',
          layoutName: 'oneCaptionThreeImages',
          cover: 'outer',
          side: 'left',
        },
        {
          pageName: 'frontOuter',
          layoutName: 'frontPage',
          cover: 'outer',
          side: 'right',
        },
      ],
      innerPages: [
        {
          pageName: 'frontInner',
          layoutName: 'oneCaptionThreeImages',
          cover: 'inner',
          side: 'left',
        },
        {
          pageName: 'backInner',
          layoutName: 'oneCaptionThreeImages',
          cover: 'inner',
          side: 'right',
        },
      ]
    };
  },
  created() {
    for (const page of this.outerPages) {
      this.$store.commit('setPageDefaults', { pageName: page.pageName, layoutName: page.layoutName, cover: page.cover, side: page.side })
    }
    for (const page of this.innerPages) {
      this.$store.commit('setPageDefaults', { pageName: page.pageName, layoutName: page.layoutName, cover: page.cover, side: page.side })
    }
  },
  methods: {
    async togglePreview(e) {
      e.preventDefault();
      this.showPreview = !this.showPreview;
    },
    async onSubmit(themeColor) {
      const { pages } = this.$store.state;

      const sections = {
        outer: [],
        inner: [],
      };

      for (const pageData of pages) {
        const page = new Page(themeColor.substring(1), pageData.layoutName);
        if (pageData.layoutName === 'frontPage') {
          sections.outer = [...sections.outer, ...page.buildFrontPageSections(pageData)];
        } else {
          for (let i = 0; i < page.layout.elements.length; i++) {
            const element = page.layout.elements[i];
            if (element === 'text') {
              sections[pageData.cover].push(page.buildTextSection(pageData.text[pageData.pageName + i], pageData.side, '000000'));
            } else if (element === 'image') {
              sections[pageData.cover].push(page.buildImageSection(pageData.images[pageData.pageName + i], pageData.side));
            }
          }
        }
      }

      this.pdfPreview = undefined;
      const arrayBuffer = await generatePdf(sections.outer, sections.inner);
      this.pdfPreview = URL.createObjectURL(new Blob([arrayBuffer], {
        type: "application/pdf"
      }));
      this.showPreview = true;
    },
  },
}
</script>

<style scoped>
.editor{
  height: 100vh;
}
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