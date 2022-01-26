<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/create">Create</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.icon-button {
  border-radius: 50%;
  background: none;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-button:hover {
  background-color: rgb(0,0,0,.1);
}
.icon-button i {
  text-align: center;
}
</style>
