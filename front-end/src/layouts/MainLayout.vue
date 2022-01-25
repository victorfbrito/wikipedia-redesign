<template>
  <div id="app-layout">
    <wiki-header />
    <router-view></router-view>
  </div>
</template>

<script>
import WikiHeader from "../components/WikiHeader.vue";

export default {
  name: "MainLayout",
  components: { WikiHeader },
};
</script>

<style>
#app {
  overflow: hidden;
}
</style>
