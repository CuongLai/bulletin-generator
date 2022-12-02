<template>
  <div v-if="type" class="flex-grow-1 p-2 d-flex flex-column">
    <Menu class="">
      <template #toggle-button="{ toggle }">
        <button class="btn icon-button" @click="toggle()">
          <i class="fas fa-ellipsis-h" />
        </button>
      </template>
      <template #dropdown-items="{ toggle }">
        <MenuItem @click="setType('text', toggle)" v-if="type === 'image'">Change to Text</MenuItem>
        <MenuItem @click="setType('image', toggle)" v-else-if="type === 'text'">Change to Image</MenuItem>
        <MenuItem @click="setType(undefined, toggle)">Remove</MenuItem>
      </template>
    </Menu>
    <div v-if="type === 'text'">
      <textarea
        :name="name"
        :value="pageData.text[name]"
        @input="event => setText(event.target.value)"
        class="form-control"
        rows="4"
      />
    </div>
    <div v-else-if="type === 'image'">
      <Dropzone
        @set-image-src="setImage"
        :name="name"
        :pageName="pageName"
      />
    </div>
  </div>
  <div v-else class="w-100">
    <Menu>
      <template #toggle-button="{ toggle }">
        <button class="btn w-100 h-100" @click="toggle()">Show</button>
      </template>
      <template #dropdown-items="{ toggle }">
        <MenuItem @click="setType('text', toggle)">Add Text</MenuItem>
        <MenuItem @click="setType('image', toggle)">Add Image</MenuItem>
      </template>
    </Menu>
    <!-- <button class="btn" @click="() => type = 'text'">Add Text</button>
    <button class="btn" @click="() => type = 'image'">Add Image</button> -->
  </div>
</template>

<script>
import Dropzone from './Dropzone.vue';
import { Menu, MenuItem } from './Menu';

export default {
  name: 'Section',
  components: {
    Dropzone,
    Menu,
    MenuItem,
  },
  props: {
    name: String,
    pageName: String,
  },
  data() {
    return {
      type: undefined,
      pageData: undefined,
    }
  },
  created() {
    this.pageData = this.$store.state.pages.find(page => page.pageName === this.pageName);
    console.log(this.pageData);
  },
  methods: {
    async setImage(file, name) {
      this.$store.commit('setImageFile', { pageName: this.pageName, name, file });
    },
    setText(text) {
      this.$store.commit('setText', {
        pageName: this.pageName,
        name: this.name,
        text,
      });
    },
    resetStore() {
      console.log(this.pageName, this.name);
      this.$store.commit('setImageFile', { pageName: this.pageName, name: this.name });
      this.$store.commit('setImagePreview', { pageName: this.pageName, name: this.name });
      this.$store.commit('setText', { pageName: this.pageName, name: this.name });
    },
    setType(type, toggleMenu) {
      if (!this.type) {
        this.$emit('type-selected', type);
      }
      this.resetStore();
      this.type = type;
      toggleMenu();
    }
  },
  emits: ['type-selected'],
}
</script>

<style scoped>

</style>