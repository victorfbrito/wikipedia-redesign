<template>
  <div id="app">
    <article-banner
      v-if="banner_image"
      :alt="banner_image.alt"
      :images="images"
      :description="banner_image.description"
      :title="title"
      :url_src="banner_image.src"
      :width="banner_image.width"
      :height="banner_image.height"
      :summary="summary"
      :views="views"
      :last_updated="last_updated"
    />
    <div class="article_text" v-for="(section, index) in content" :key="index">
      <article-section
        :content="section"
        :index="index + 1"
        :subject="title"
        :reading_time="reading_time"
      />
    </div>
    <div class="default_images" v-for="(img, key) in images" :key="key">
      <img-block
        :alt="img.alt"
        :url_src="img.src"
        :description="img.description"
        :width="img.width"
        :height="img.height"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

import { store } from "../shared/store";
import { search_api } from "../core/api.js";

import ImgBlock from "../components/ImgBlock.vue";
import ArticleBanner from "../components/ArticleBanner.vue";
import ArticleSection from "../components/ArticleSection.vue";

function PxToRem(px) {
  return px * 0.0625;
}

export default {
  name: "Article",
  components: {
    ImgBlock,
    ArticleBanner,
    ArticleSection,
  },
  beforeMount() {
    this.subject = this.$route.params.subject;
  },
  data() {
    return {
      language: store.state.language,
      subject: "",
      title: null,
      content: null,
      banner_image: null,
      images: [],
      summary: null,
      last_updated: null,
      views: 0,
      reading_time: null,
    };
  },
  watch: {
    $route(route) {
      this.resetContent();
      this.subject = route.params.subject;
    },
    images: function () {
      this.getMainImage();
    },
    subject: function () {
      this.getIntro(this.subject);
      this.getContent(this.subject);
      this.getImages(this.subject);
    },
  },
  methods: {
    resetContent() {
      (this.title = null), (this.content = null);
      this.banner_image = null;
      this.images = [];
      this.reading_time = null;
      this.summary = null;
      (this.last_updated = null), (this.views = 0);
    },
    getContent(mainSubject) {
      console.log(window.location.pathname);
      const params = {
        origin: "*",
        action: "query",
        format: "json",
        prop: "extracts|pageviews",
        titles: mainSubject,
        list: "recentchanges",
        rctitle: mainSubject,
        rctoponly: "1",
        rclimit: "1",
        rcprop: "user|timestamp",
      };

      axios.get(search_api, { params }).then((res) => {
        const page = res.data.query.pages[Object.keys(res.data.query.pages)[0]];
        this.title = page.title;
        this.reading_time = this.readingTime(page.extract);
        this.content = this.splitContent(page.extract);
        this.views = Object.values(page.pageviews).reduce((a, b) => a + b);
        this.last_updated = {
          user: res.data?.query?.recentchanges[0]?.user,
          date: moment(res.data.query?.recentchanges[0]?.timestamp).format(
            "DD MMM YYYY"
          ),
        };
      });
    },
    getIntro(mainSubject) {
      const params = {
        origin: "*",
        action: "query",
        format: "json",
        prop: "extracts",
        titles: mainSubject,
        exintro: "1",
        exsentences: "3",
      };
      axios.get(search_api, { params }).then((res) => {
        this.summary =
          res.data.query.pages[Object.keys(res.data.query.pages)[0]].extract;
      });
    },
    getImages(mainSubject) {
      let params = {
        origin: "*",
        action: "query",
        format: "json",
        titles: mainSubject,
        prop: "info|imageinfo",
        generator: "images",
        iiprop: "url|extmetadata|dimensions",
        gimdir: "ascending",
      };
      let array = [];
      axios
        .get(search_api, { params })
        .then((res) => {
          let data = res.data.query.pages;
          Object.entries(data).map(([k, v]) => ({ [k]: v }));
          for (let image in data) {
            array.push({
              alt: data[image].title,
              src: data[image].imageinfo[0].url,
              description:
                data[image].imageinfo[0].extmetadata?.ImageDescription?.value ||
                "no description available",
              height: PxToRem(data[image].imageinfo[0].height),
              width: PxToRem(data[image].imageinfo[0].width),
            });
          }
          this.images = array;
        })
        .catch(function (error) {
          console.log(error);
        });
      return array;
    },
    getMainImage() {
      let img = {
        alt: "",
        description: "",
        height: 0,
        width: 0,
        src: null,
      };
      Array.from(this.images).some((e) => {
        if (e.width > img.width && e.height > img.height) {
          img = e;
          if (e.width >= window.innerWidth) return true;
          return false;
        }
      });
      this.banner_image = img;
    },
    splitContent(extract) {
      return extract.split(/(?=<h2>)/g);
    },
    readingTime(text) {
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      return time;
    },
  },
};
</script>

<style>
.v-lazy-image {
  opacity: 0;
  transition: opacity 2s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
#app {
  overflow: hidden;
}

.default_images {
  overflow: hidden;
  background-color: red;
  width: 100vw;
}
.default_images img {
  max-width: 100vw;
}

.article_text {
  padding: 0 var(--size10);
}
</style>
