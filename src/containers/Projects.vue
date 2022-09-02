<template>
  <div>
    <h1>Projects</h1>
    <button type="button" class="btn btn-primary" @click="$emit('create-new-project')">New Project</button>
  </div>
</template>

<script>
export default {
  name: 'Projects',
};
</script>

<style scoped>

</style>