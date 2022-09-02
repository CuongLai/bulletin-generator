<template>
  <cp
    theme="light"
    :color="color"
    :sucker-hide="true"
    @changeColor="changeColor"
  />
</template>

<script>
import { ColorPicker as cp } from 'vue-color-kit';
import 'vue-color-kit/dist/vue-color-kit.css';
 
export default {
  name: 'ColorPicker',
  components: {
    cp,
  },
  props: {
    triggerId: String,
    defaultColor: String,
  },
  data() {
    return {
      color: this.defaultColor,
    }
  },
  mounted() {
    this.updatePosition();
    window.onresize = () => {
      this.updatePosition();
    }

    document.onclick = (e) => {
      if (e.target.id !== this.triggerId && !this.checkIfParentContainsClass(e.target, 'hu-color-picker')) {
        this.$emit('close-picker');
      }
    }
  },
  methods: {
    checkIfParentContainsClass(node, className) {
      if (node.classList && node.className.includes(className)) {
        return true;
      } else if (node.parentNode) {
        return this.checkIfParentContainsClass(node.parentNode, className);
      } else {
        return false;
      }
    },
    changeColor(color) {
      const { r, g, b, a } = color.rgba;
      this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      this.$emit('on-change-color', color.hex);
    },
    updatePosition() {
      const buttonPosition = document.getElementById(this.triggerId).offsetLeft;
      document.querySelector('.hu-color-picker').style.left = `${buttonPosition}px`;
    }
  },
}
</script>

<style scoped>
.hu-color-picker {
  width: 218px !important;
  position: absolute;
  box-shadow: 0px 0px 5px gray;
}
</style>