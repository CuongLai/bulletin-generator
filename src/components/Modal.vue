<template>
  <vue-final-modal v-slot="{ params, close }" v-bind="$attrs" classes="v-modal-container" content-class="v-modal">
    <span class="v-modal-title">
      <h3><slot name="title"></slot></h3>
      <button type="button" class="btn" @click="close"><i class="fas fa-times"></i></button>
    </span>
    <div class="v-modal-content">
      <slot :params="params"></slot>
    </div>
    <div class="v-modal-actions" v-if="showFooter === true">
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
  max-height: 100%;
  margin: 0 1rem;
  padding: 1rem;
  background: #fff;
}

.v-modal-title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
  padding: .5rem 0;
}
.v-modal-title h3 {
  flex: 1;
  margin: 0;
}
.v-modal-title button {
  border-radius: 50%;
  background: none;
}

.v-modal-content {
  min-height: 1rem;
}

.v-modal-actions {
  display: flex;
  width: 100%;
  justify-content: flex-end;
}
.v-modal-actions button {
  margin-right: 1rem;
}
/* .modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
} */
</style>