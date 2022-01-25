<template>
  <div id="main">
    <img
      id="image_block"
      :src="url_src"
      :alt="alt"
      :style="{ width: width + 'rem', height: height + 'rem' }"
    />
    <p class="primary subtitle" v-html="description" />
  </div>
</template>

<script>
export default {
  name: "ImgBlock",
  props: ["alt", "url_src", "description", "width", "height"],
};
</script>

<style scoped>
#image_block {
  /* width: 100px;
  height: 100px; */
}
</style>