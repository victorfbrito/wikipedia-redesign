<template>
  <div id="main" class="header">
    <img class="icon" src="../assets/wikipedia_logo_1.svg" />
    <wiki-header-redirects />
    <search-bar />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import WikiHeaderRedirects from "./WikiHeaderRedirects.vue";

export default {
  components: { WikiHeaderRedirects, SearchBar },
  name: "WikiHeader",
  props: [],
};
</script>

<style scoped>
.header {
  position: absolute;
  width: 100%;
  max-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--size10);
  color: var(--base);
  z-index: 5;
  padding: 0 var(--size10);
  border-bottom: 1px solid var(--secondary);
}

.icon {
  width: var(--size5);
  height: var(--size5);
}

@media screen and (max-width: 992px) {
  .info {
    margin-right: 0%;
  }

  .header {
    padding: 0 var(--size4);
  }
}
</style>