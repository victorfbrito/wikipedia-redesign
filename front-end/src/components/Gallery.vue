<template>
  <div id="main" class="article_section">
    <div class="main_content">
      <h2 class="intro_title">Galeria</h2>
      <carousel class="story-carousel story-carousel--multiple story-carousel--images"
        :hideArrows="false"
        :hideArrowsOnBound="true"
      >
        <slide class="story-carousel__slide" v-for="(item, index) in images" :key="index">
          <gallery-image
            :src="item.src" 
            :alt="item.alt" 
            :height="'200px'" 
            :width="'200px'"
        />
        </slide>
      </carousel>
    </div>
  </div>
</template> 
<script>
import GalleryImage from './GalleryImage.vue';
import { Carousel, Slide } from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'

export default {
  components: { 
    GalleryImage,
    Carousel,
    Slide
  },
  name: "Gallery",
  props: ["images"],
  methods: {
    consoleLog(par) {
      console.log('par: ',par)
    }
  }
};
</script>
<style scoped>

.story-carousel:deep(button) {
  border-radius: 50%;
  border: 1px solid var(--primary);
  background-color: var(--base);
  color: var(--primary);
}

.story-carousel__slide {
  flex: 0 0 calc((var(--size10) * 4) + 2rem);
}

.intro_title {
  margin: 0;
  margin-bottom: var(--size4);
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

</style>