<template>
  <div>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/edit">Edit</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
button {
  box-shadow: none !important;
}
.icon-button {
  border-radius: 50%;
  background: none;
  width: 40px;
  height: 40px;
  padding: 0;
}
.icon-button:hover {
  background-color: rgb(0,0,0,.1);
}
.icon-button i {
  text-align: center;
}
</style>
