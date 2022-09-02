<template>
  <vue-final-modal v-slot="{ params, close }" v-bind="$attrs" classes="v-modal-container" content-class="v-modal">
    <span class="v-modal-title">
      <h5><slot name="title"></slot></h5>
      <div class="toolbar">
        <slot name="toolbar-buttons"></slot>
        <button type="button" class="btn icon-button" @click="close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </span>
    <div class="v-modal-content">
      <slot :params="params"></slot>
    </div>
    <div class="v-modal-actions" v-if="showFooter">
      <button type="button" class="btn btn-danger" @click="$emit('cancel', close)">{{cancelText}}</button>
      <button type="button" class="btn btn-primary" @click="$emit('confirm', close)">{{confirmText}}</button>
    </div>
  </vue-final-modal>
</template>

<script>
import { VueFinalModal } from 'vue-final-modal';

export default {
  name: 'CustomModal',
  components: {
    VueFinalModal,
  },
  props: {
    showFooter: {
      type: Boolean,
      default: true,
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
  },
  inheritAttrs: false,
  emits: ['confirm', 'cancel']
}
</script>

<style scoped>
::v-deep(.v-modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep(.v-modal) {
  display: flex;
  flex-direction: column;
  max-height: 95%;
  max-width: 95%;
  min-width: 50%;
  min-height: 30%;
  margin: 0 1rem;
  padding: 1rem;
  background: #fff;
  border-radius: 10px;
}

.v-modal-title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: .5rem 0;
}
.v-modal-title h5 {
  flex: 1;
  margin: 0;
}

.toolbar {
  display: flex;
  align-items: center;
}

.v-modal-content {
  min-height: 1rem;
  overflow: auto;
  border-radius: 0 0 10px 10px;
  flex: 1;
}

.v-modal-actions {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.v-modal-actions button {
  margin-right: 1rem;
}
</style>