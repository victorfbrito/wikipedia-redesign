<template>
  <div id="main_container" class="main_container base">
    <transition name="fade">
      <img
        v-on:load="onLoaded"
        v-show="loaded"
        id="background_image"
        :src="url_src"
        :alt="alt"
        class="background_image"
      />
    </transition>
    <div class="banner_content">
      <div class="info">
        <p class="text_m" v-if="last_updated">
          Last update by <b>{{ last_updated.user }}</b> at
          <b>{{ last_updated.date }}</b>
        </p>
        <h1 class="title_xxl big_title">{{ title }}</h1>
        <p class="text_s views" v-if="views">{{ views }} views last month</p>
        <div class="summary text_m" v-html="summary" />
        <big-button-carroussel />
      </div>
      <div class="article_arrow button_m_bold">Read article</div>
    </div>
  </div>
</template>

<script>
import BigButtonCarroussel from "./HorizontalButtonCarroussel.vue";

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
  data: function () {
    return {
      loaded: false,
    };
  },
  methods: {
    onLoaded() {
      this.loaded = true;
    },
  },
};
</script>

<style scoped>
.main_container {
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: var(--primary);
  overflow: hidden;
}

.background_image {
  position: absolute;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  object-fit: cover;
}

.banner_content {
  background-image: radial-gradient(circle at 70%, transparent, #000);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  padding: calc(var(--app-margin) + var(--size3)) var(--app-margin);
}

.info {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 50%;
}

.summary {
  margin-top: 0;
  text-overflow: ellipsis;
  overflow: hidden;
}

.summary {
  display: -webkit-box;
  -webkit-line-clamp:8;
  -webkit-box-orient: vertical;
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

.article_arrow {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: var(--size1);
  margin: var(--size4);
  align-items: center;
}

.article_arrow:after {
  display: block;
  content: " ";
  background-image: url("../assets/circled_arrow.svg");
  background-size: var(--size2);
  height: var(--size2);
  width: var(--size2);
}

@media screen and (max-width: 992px) {
  .info {
    padding-right: 0%;
  }

  .summary {
    -webkit-line-clamp: 5;
    margin-bottom: var(--size10);
  }
}
</style>