<template>
  <div class="home">
    <h1>Projects</h1>
    <button type="button" class="btn btn-primary" @click="toggleModal">New Project</button>
    <Modal v-model="showModal" @confirm="confirm" @cancel="cancel" confirmText="Create">
      <template v-slot:title>Configure</template>
      <p>Configure your project</p>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  name: 'Home',
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
    },
    confirm() {
      this.$router.push('/edit');
    },
    cancel(close) {
      close();
    },
  },
}
</script>
