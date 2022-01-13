<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <Thumbnail
      v-if="thumbnail"
      :alt="thumbnail.alt"
      :url_src="thumbnail.src"
      :description="thumbnail.description"
      :title="content.title"
      :width="thumbnail.width"
      :height="thumbnail.height"
      :summary="content.intro"
    />
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
import MainInfo from "./components/MainInfo.vue";
import ImgBlock from "./components/ImgBlock.vue";
import Thumbnail from "./components/Thumbnail.vue";
import axios from "axios";

var url = "https://en.wikipedia.org/w/api.php";

function PxToRem(px) {
  return px * 0.0625;
}

export default {
  name: "App",
  components: {
    ImgBlock,
    MainInfo,
    Thumbnail,
  },
  data() {
    return {
      title: null,
      subject: "Pedro_II_of_Brazil",
      content: null,
      thumbnail: null,
      images: [],
      category: "",
      summary: null,
    };
  },
  methods: {
    getContent(mainSubject) {
      const params = {
        origin: "*",
        action: "query",
        format: "json",
        prop: "extracts",
        titles: mainSubject,
        explaintext: "1",
        exsectionformat: "wiki",
      };

      axios.get(url, { params }).then((res) => {
        let res_text =
          res.data.query.pages[Object.keys(res.data.query.pages)[0]].extract;
        res_text = res_text
          .replaceAll("======", "=h6=")
          .replaceAll("=====", "=h5=")
          .replaceAll("====", "=h4=")
          .replaceAll("===", "=h3=")
          .replaceAll("==", "=h2=");

        function TextToObj(text, carry) {
          let obj_text = { topics: [] };
          let raw_text = text.split(`=h${carry}=`);
          if (raw_text.length <= 1) {
            return raw_text[0];
          }

          raw_text = raw_text.map((e) => e.trim());

          if (raw_text.length % 2 != 0) {
            obj_text.intro = raw_text[0];
            raw_text.shift();
          }

          for (let i = 0; i < raw_text.length; i += 2) {
            obj_text.topics.push({
              title: raw_text[i],
              content:
                carry < 6
                  ? TextToObj(raw_text[i + 1], carry + 1)
                  : raw_text[i + 1],
            });
          }
          return obj_text;
        }

        const final_obj = {
          title:
            res.data.query.pages[Object.keys(res.data.query.pages)[0]].title,
          ...TextToObj(res_text, 2),
        };
        this.content = final_obj;
      });
    },
    getImages(mainSubject) {
      let params = {
        origin: "*",
        action: "query",
        titles: mainSubject,
        format: "json",
        prop: "images",
        imdir: "descending",
        imlimit: "20",
      };

      axios
        .get(url, { params })
        .then((res) => {
          let data =
            res.data.query.pages[Object.keys(res.data.query.pages)[0]].images;
          for (let image in data) {
            params = {
              origin: "*",
              action: "query",
              titles: data[image].title,
              prop: "imageinfo",
              iiprop: "url|extmetadata|dimensions",
              format: "json",
            };
            axios.get(url, { params }).then((res) => {
              let img =
                res.data.query.pages[Object.keys(res.data.query.pages)[0]]
                  .imageinfo[0];
              this.images.push({
                alt: data[image].title,
                src: img.url,
                description:
                  img.extmetadata.ImageDescription.value || "no description",
                height: PxToRem(img.height),
                width: PxToRem(img.width),
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getThumbnail(mainSubject) {
      const params = {
        origin: "*",
        action: "query",
        format: "json",
        prop: "pageimages",
        titles: mainSubject,
        pithumbsize: "1000",
      };

      axios.get(url, { params }).then((res) => {
        console.log("w: ", window.innerWidth, " h: ", window.innerHeight);
        let img = res.data.query.pages[Object.keys(res.data.query.pages)[0]];
        this.thumbnail = {
          alt: img.title,
          src: img.thumbnail.source,
          description: img.title,
        };
        console.log("thumb: ", this.thumbnail);
      });
    },
  },
  mounted() {
    this.getContent(this.subject);
    this.getImages(this.subject);
    this.getThumbnail(this.subject);
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
