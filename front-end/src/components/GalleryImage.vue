<template>
  <div id="main">
    <img
      id="image_block"
      class="image_block bordered"
      :src="src"
      :alt="alt"
    />
    <p class="primary subtitle" v-html="description" />
  </div>
</template>

<script>
export default {
  name: "ImgBlock",
  props: ["alt", "src", "description", "width", "height"],
};
</script>

<style scoped>
.image_block {
    object-fit: cover;
    width: calc(var(--size10) * 4);
    height: calc(var(--size10) * 2);
}
</style>