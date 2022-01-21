<template>
  <div id="main" class="article_section">
    <div v-if="index === 1" class="intro_content">
      <vertical-button-carroussel/>
      <h1 class="intro_title">{{ title }}</h1>
      <p class="reading_time">{{ this.reading_time }} min read</p>
      <div v-html="text" class="main_content" />
    </div>
    <div v-else v-html="text" class="main_content" />
  </div>
</template> 
<script>
import VerticalButtonCarroussel from './VerticalButtonCarroussel.vue';
export default {
  components: { VerticalButtonCarroussel },
  name: "ArticleSection",
  props: ["index", "content", "subject", "reading_time"],
  data: function () {
    return {
      title: this.subject,
      text: this.content.replace("<h2>", "<h2>" + this.index + ".0 "),
    };
  },
};
</script>
<style scoped>
.intro_title {
  margin: 0;
}

.reading_time {
  display: flex;
  align-items: center;
  gap: var(--size1);
  margin: 0 0 var(--size1) 0;
}

.reading_time:before {
  display: block;
  content: " ";
  height: var(--size1);
  width: var(--size1);
  background-image: url("../assets/clock_icon.svg");
  background-size: var(--size1);
}

.intro_content {
  /* position: relative; */
  margin-top: var(--size8);
}

.article_section {
  padding: var(--size1) var(--size10);
  border-bottom: 1px solid var(--secondary);
}

.article_section:deep(p) {
  color: var(--secondary);
  line-height: var(--size3);
}

.article_section:deep(h2) {
  margin-bottom: var(--size4);
}

.article_section:deep(h3) {
  margin-bottom: var(--size3);
}
</style>