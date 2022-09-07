<template>
  <div >
  <slot name="toggle-button" :toggle="toggle"></slot>
  <div class="menu" v-if="showMenu" v-click-outside="() => showMenu = false">
    <slot name="dropdown-items" :toggle="toggle"></slot>
  </div>
  </div>
</template>

<script>
const clickOutside = {
  beforeMount: function (el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    // HACK: prevent immediate toggling of menu after opening
    setTimeout(() => {
      document.body.addEventListener('click', el.clickOutsideEvent);
    }, 100)
  },
  unmounted: function (el) {
    console.log('unmounted');
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}

export default {
  name: 'Menu',
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggle() {
      console.log('toggle')
      this.showMenu = !this.showMenu;
    }
  },
  directives: {
    'click-outside': clickOutside,
  }
}
</script>

<style scoped>
.menu {
  min-width: 10rem;
  z-index: 1000;
  padding: .5rem 0;
  margin: .125rem 0 0;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
  background-color: #fff;
  position: absolute;
}
</style>