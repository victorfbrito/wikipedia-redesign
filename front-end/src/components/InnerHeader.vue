<template>
  <div id="inner-header" class="inner_header">
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
.inner_header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--size10);
  padding: 0 var(--app-margin);
  border-bottom: 1px solid var(--secondary);
}

.icon {
  width: var(--size5);
  height: var(--size5);
}

@media screen and (max-width: 992px) {

  .icon {
    width: var(--size3);
    height: var(--size3);
  }
  .info {
    margin-right: 0%;
  }

  .inner_header {
    padding: 0 var(--size4);
    height: var(--size8);
  }
}
</style>