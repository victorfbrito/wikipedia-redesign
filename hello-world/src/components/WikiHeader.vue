<template>
  <div id="main" class="header">
    <outer-header/>
    <inner-header/>
  </div>
</template>

<script>
import OuterHeader from "../components/OuterHeader.vue";
import InnerHeader from "../components/InnerHeader.vue";

export default {
  name: "WikiHeader",
  components: {
    InnerHeader,
    OuterHeader
  }
};
</script>

<style scoped>

.header {
  color: var(--base);
  z-index: 5;
  width: 100%;
  max-width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
}

</style>