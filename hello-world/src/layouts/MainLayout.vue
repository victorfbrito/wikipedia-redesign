<template>
  <div id="app">
    <!-- <wiki-header /> -->
    <slot></slot>
  </div>
</template>

<script>
// import WikiHeader from "../components/WikiHeader.vue";

export default {
  name: "MainLayout",
  // components: { WikiHeader },
};
</script>

<style>
#app {
  overflow: hidden;
}
</style>
