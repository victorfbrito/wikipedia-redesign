<template>
  <div id="main" class="article_section">
    <div v-if="index === 1" class="intro_content">
      <h1 class="intro_title">{{ title }}</h1>
      <p class="reading_time">{{ this.reading_time }} min read</p>
      <div v-html="text" class="main_content" />
    </div>
    <div v-else v-html="text" class="main_content" />
  </div>
</template> 
<script>
export default {
  name: "ArticleSection",
  props: ["index", "content", "subject", "reading_time"],
  data: function () {
    return {
      title: this.subject,
      text: this.content.replace("<h2>", "<h2>" + this.index + ".0 "),
      // min_reading_time: this.reading_time,
    };
  },
};
</script>
<style scoped>
.intro_title {
  margin: 0;
}

.reading_time {
  margin: 0;
}
.intro_content {
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