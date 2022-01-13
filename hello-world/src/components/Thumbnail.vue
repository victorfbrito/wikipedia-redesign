<template>
  <div
    id="thumb_container"
    class="thumb_container"
    :class="{ primary: isDark, base: !isDark }"
  >
    <img id="thumb_img" :src="url_src" :alt="alt" class="thumb_img" />
    <div
      class="thumb_content"
      :style="{
        backgroundImage:
          '-webkit-radial-gradient(circle, transparent, ' +
          this.background_color +
          ')',
      }"
    >
      <h1 class="title_xxl">{{ title }}</h1>
      <p>{{ summary }}</p>
    </div>
  </div>
</template>

<script>
import FastAverageColor from "../../node_modules/fast-average-color/dist/index.js";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function harmonizeColor(rgb) {
  const R = rgb[0];
  const G = rgb[1];
  const B = rgb[2];
  if ((R + G + B) / 3 <= 64) {
    return "#fff";
  } else if ((R + G + B) / 3 >= 701) {
    return "#000";
  } else {
    return rgbToHex(R, G, B);
  }
}

export default {
  name: "Thumbnail",
  props: [
    "alt",
    "title",
    "url_src",
    "description",
    "width",
    "height",
    "summary",
  ],
  data() {
    return {
      dark_text: false,
      background_color: "#000",
    };
  },
  methods: {
    getAverageColor(imgurl) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(imgurl)
        .then((color) => {
          this.background_color = harmonizeColor(color.value);
          this.dark_text = color.isDark ? true : false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getAverageColor(this.url_src);
  },
};
</script>

<style scoped>
.thumb_container {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-size: cover;
}

.thumb_img {
  position: absolute;
  right: 0;
  max-width: 100vw;
  max-height: 100vh;
}

.thumb_content {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>