<template>
  <button class="dropdown-item"><slot /></button>
</template>

<script>
export default {
  name: 'MenuItem',
}
</script>

<style scoped>
.dropdown-item {
  outline: none;
}
</style>