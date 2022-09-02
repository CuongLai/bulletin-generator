<template>
  <div id="pdf-viewer">
    <div id="pdf-actions">
      <div id="pdf-button-wrapper">
        <button type="button" @click="zoomOut" class="btn icon-button">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" @click="scale = 80" class="btn icon-button">
          <i class="fas fa-expand"></i>
        </button>
        <button type="button" @click="zoomIn" class="btn icon-button">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
    <pdf :src="pdfData" v-for="i in numPages" :key="i" :page="i" class="pdf-page" :resize="true" :style="{ width: scale + '%' }">
      <template slot="loading">
        Loading...
      </template>
    </pdf>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer';

export default {
  name: 'PdfViewer',
  components: {
    pdf: pdfvuer,
  },
  props: ['pdfSrc'],
  mounted() {
    this.getPdf();
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfData: undefined,
      scale: 80,
    }
  },
  methods: {
    async getPdf() {
      this.pdfData = pdfvuer.createLoadingTask(this.pdfSrc);
      this.pdfData.then((pdf) => {
        this.numPages = pdf.numPages;
      });
    },
    zoomIn() {
      if (this.scale < 200) {
        this.scale += 10;
      }
    },
    zoomOut() {
      if (this.scale > 10) {
        this.scale -= 10;
      }
    },
  }
}
</script>

<style scoped>
#pdf-viewer {
  position: relative;
}

#pdf-actions {
  position: fixed;
  z-index: 1;
  display: flex;
  justify-content: center;
  width: 100%;
}

#pdf-button-wrapper {
  display: flex;
  background: rgba(0, 0, 0, .5);
  border-radius: 15% / 50%;
}
#pdf-button-wrapper button i {
  color: white;
}

.pdf-page {
  margin: 1rem auto;
}
::v-deep(.page) {
  margin: auto;
}
</style>