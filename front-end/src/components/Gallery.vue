<template>
  <div id="main" class="article_section">
    <div class="main_content">
      <h2 class="intro_title">Galeria</h2>
      <div class="gallery_carroussel">
        <gallery-image 
            v-for="(item, index) in images" 
            :key="index" 
            :src="item.src" 
            :alt="item.alt" 
            :height="item.height" 
            :width="item.width"
        />
      </div>
    </div>
  </div>
</template> 
<script>
import GalleryImage from './GalleryImage.vue';
export default {
  components: { GalleryImage },
  name: "Gallery",
  props: ["images"]
};
</script>
<style scoped>

.gallery_carroussel {
    gap: var(--size3);
    display: flex;
}

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
  margin-top: var(--size8);
}

.article_section {
  padding: var(--size4) 0;
  margin: 0 var(--app-margin);
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