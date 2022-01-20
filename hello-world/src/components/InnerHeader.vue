<template>
  <div id="inner-header" class="inner-header">
    <img class="icon" src="../assets/wikipedia_logo_1.svg" />
    <wiki-header-redirects v-if="desktop" />
    <search-bar />
  </div>
</template>

<script>
import SearchBar from "./SearchBar.vue";
import WikiHeaderRedirects from "./WikiHeaderRedirects.vue";

export default {
  components: {
    WikiHeaderRedirects,
    SearchBar,
  },
  name: "InnerHeader",
  props: [],
  data() {
    return {
      desktop: false,
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth > 992) {
        this.desktop = true;
      } else {
        this.desktop = false;
      }
    },
  },
  mounted() {
    this.onResize();
  },
  created() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.inner-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--size10);
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