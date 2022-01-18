<template>
  <div class="main">
    <wiki-header />
    <slot></slot>
  </div>
</template>

<script>
import WikiHeader from "../components/WikiHeader.vue";

export default {
  name: "Home",
  components: [WikiHeader],
};
</script>

<style scoped>
</style>