<template>
  <div id="main">
    <img id="image_block" :src="url_src" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: "ImgBlock",
  props: ["alt", "url_src"],
};
</script>

<style scoped>
#image_block {
  width: 100px;
  height: 100px;
}
</style>