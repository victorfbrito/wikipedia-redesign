<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <MainImage
      v-if="main_container"
      :alt="main_container.alt"
      :images="images"
      :description="main_container.description"
      :title="title"
      :url_src="main_container.src"
      :width="main_container.width"
      :height="main_container.height"
      :summary="summary"
    />
    <div v-html="content" class="main_content">{{ content }}</div>
    <MainInfo :content="content" />
    <div v-for="(img, key) in images" :key="key">
      <ImgBlock
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
import ImgBlock from "./components/ImgBlock.vue";
import MainImage from "./components/MainImage.vue";
import axios from "axios";

var lng = "en";
var url = "https://" + lng + ".wikipedia.org/w/api.php";

function PxToRem(px) {
  return px * 0.0625;
}

export default {
  name: "App",
  components: {
    ImgBlock,
    MainImage,
  },
  data() {
    return {
      title: null,
      subject: "Harry_Styles",
      content: null,
      thumbnail: null,
      main_container: null,
      images: [],
      category: "",
      summary: null,
    };
  },

  watch: {
    images: function () {
      this.getMainImage();
    },
  },
  methods: {
    getContent(mainSubject) {
      const params = {
        origin: "*",
        action: "query",
        format: "json",
        prop: "extracts",
        titles: mainSubject,
      };

      axios.get(url, { params }).then((res) => {
        const page = res.data.query.pages[Object.keys(res.data.query.pages)[0]];
        console.log("reeeees: ", page.extract.split("</p>"));
        this.title = page.title;
        this.content = page.extract;
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
        gimdir: "descending",
      };
      let array = [];
      axios
        .get(url, { params })
        .then((res) => {
          console.log("original: ", res);
          let data = res.data.query.pages;
          Object.entries(data).map(([k, v]) => ({ [k]: v }));
          for (let image in data) {
            array.push({
              alt: data[image].title,
              src: data[image].imageinfo[0].url,
              description:
                data[image].imageinfo[0].extmetadata?.ImageDescription?.value ||
                "no description",
              height: PxToRem(data[image].imageinfo[0].height),
              width: PxToRem(data[image].imageinfo[0].width),
            });
          }
          this.images = array;
        })
        // .then(() => this.getMainImage())
        .catch(function (error) {
          console.log(error);
        });
      return array;
    },
    // getThumbnail(mainSubject) {
    //   const params = {
    //     origin: "*",
    //     action: "query",
    //     format: "json",
    //     prop: "pageimages",
    //     titles: mainSubject,
    //     pithumbsize: "1000",
    //   };

    //   axios
    //     .get(url, { params })
    //     .then((res) => {
    //       let img = res.data.query.pages[Object.keys(res.data.query.pages)[0]];
    //       console.log("img: ", img);
    //       this.thumbnail = {
    //         alt: img.title,
    //         src: img.thumbnail.source,
    //         description: img.title,
    //       };
    //     })
    //     .catch(function () {
    //       this.thumbnail = {
    //         alt: "undefined",
    //         src: undefined,
    //         description: "undefined",
    //       };
    //     });
    // },
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
      this.main_container = img;
    },
  },
  beforeMount() {
    this.getImages(this.subject);
  },
  mounted() {
    this.getContent(this.subject);
    this.getImages(this.subject);
    // this.getThumbnail(this.subject);
  },
};
</script>

<style>
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
