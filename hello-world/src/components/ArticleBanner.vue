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
      class="banner_content"
      :style="{
        backgroundImage:
          '-webkit-radial-gradient(circle, transparent, ' +
          this.background_color +
          ')',
      }"
    >
      <div class="info">
        <p class="text_m" v-if="last_updated">
          Last updated by <b>{{ last_updated.user }}</b> at
          <b>{{ last_updated.date }}</b>
        </p>
        <h1 class="title_xxl title">{{ title }}</h1>
        <p class="text_s views" v-if="views">{{ views }} views last month</p>
        <div class="summary text_m" v-html="summary">{{ summary }}</div>
      </div>
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
    "views",
    "last_updated",
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
  width: 100vw;
  height: 100vh;
}

.background_image {
  /* position: absolute; */
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  object-fit: cover;
}

.banner_content {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 100%;
  z-index: 1;
  padding: var(--size10);
}

.info {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.summary {
  margin-top: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}

.views {
  display: flex;
  align-items: center;
  gap: var(--size2);
}

.views:before {
  display: block;
  content: " ";
  height: var(--size1);
  width: var(--size1);
  background-color: white;
  -webkit-mask-image: url("../assets/search_icon.svg");
  mask-image: url("../assets/search_icon.svg");
  background-size: var(--size1);
}

@media screen and (min-width: 992px) {
  .info {
    margin-right: 50%;
  }
}
</style>