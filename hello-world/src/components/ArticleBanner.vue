<template>
  <div id="main_container" class="main_container base white_bg">
    <img
      id="background_image"
      :src="url_src"
      :alt="alt"
      class="background_image"
    />
    <div
      class="banner_content"
      :style="{
        backgroundImage: 'radial-gradient(circle at 65%, transparent, #000)',
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
        <big-button-carroussel />
      </div>
    </div>
  </div>
</template>

<script>
import BigButtonCarroussel from "./BigButtonCarroussel.vue";

export default {
  components: { BigButtonCarroussel },
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
  height: 100vh;
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
  gap: var(--size1);
  margin: 0;
}

.views:before {
  display: block;
  content: " ";
  height: var(--size1);
  width: var(--size1);
  background-image: url("../assets/search_icon.svg");
  background-size: var(--size1);
}

@media screen and (min-width: 992px) {
  .info {
    margin-right: 50%;
  }
}
</style>