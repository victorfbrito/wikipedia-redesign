<template>
  <div id="main">
    <img
      class="image_block image_thumbnail bordered"
      :src="src"
      :alt="alt"
      @click="this.open = !this.open"
    />
    <div class="image_open" v-if="open">
      <span
        class="open_image_background"
        @click="this.open = !this.open"
      />
      <inner-image-zoom
        class="image_block zoomable_image" 
        :src="src"
        :height="600"
        :width="600"
      />
    </div>
    <p class="primary subtitle" v-html="description" />
  </div>
</template>

<script>
import InnerImageZoom from 'vue-inner-image-zoom';

export default {
  name: "ImgBlock",
  components: {
    InnerImageZoom
  },
  props: ["alt", "src", "description", "width", "height"],
  data() {
    return {
      open: false
    }
  },
};
</script>

<style scoped>
.image_block {
  object-fit: cover;
}

.image_thumbnail {
  width: calc(var(--size10) * 4);
  height: calc(var(--size10) * 2);
}

.image_open {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.open_image_background {
  background-color: rgba(0, 0, 0, 0.750);
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.zoomable_image {
  z-index: 11;
}

.image_block:hover {
  cursor: pointer;
}

</style>