<template>
  <div
    id="main_container"
    class="main_container"
    :class="{ primary: dark, base: !dark, black_bg: dark, white_bg: !dark }"
  >
    <img
      id="background_image"
      :src="url_src"
      :alt="alt"
      class="background_image"
    />
    <div
      class="main_content"
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
import FastAverageColor from "fast-average-color";

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// eslint-disable-next-line no-unused-vars
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
  name: "MainImage",
  props: [
    "alt",
    "title",
    "description",
    "width",
    "height",
    "url_src",
    "summary",
  ],
  data() {
    return {
      dark: false,
      background_color: "#000",
    };
  },
  methods: {
    getAverageColor(imgurl) {
      const fac = new FastAverageColor();
      fac
        .getColorAsync(imgurl)
        .then((color) => {
          // this.background_color = harmonizeColor(color.value);
          this.background_color = color.isDark ? "#fff" : "#000";
          this.dark = color.isDark ? true : false;
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
.main_container {
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100vw;
  height: 100vh;
}

.background_image {
  position: absolute;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  object-fit: cover;
}

.main_content {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>