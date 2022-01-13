<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <div v-for="(img, key) in images" :key="key">
      <ImgBlock
        :alt="img.alt"
        :url_src="img.src"
        :description="img.description"
        :width="img.width"
        :height="img.height"
      />
    </div>
    <MainInfo :content="content" />
  </div>
</template>

<script>
import MainInfo from "./components/MainInfo.vue";
import ImgBlock from "./components/ImgBlock.vue";
import axios from "axios";

var url = "https://en.wikipedia.org/w/api.php";

export default {
  name: "App",
  components: {
    ImgBlock,
    MainInfo,
  },
  data() {
    return {
      content: null,
      images: [],
    };
  },
  methods: {
    getData(mainSubject) {
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

        console.log("final obj: ", TextToObj(res_text, 2));
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
        // prop: "pageimages",
        format: "json",
        prop: "images",
        imdir: "descending",
        imlimit: "20",
      };

      axios
        .get(url, { params })
        .then((res) => {
          console.log("res: ", res);
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
              console.log(img);
              this.images.push({
                alt: data[image].title,
                src: img.url,
                description:
                  img.extmetadata.ImageDescription.value || "no description",
                height: img.height,
                width: img.width,
              });
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData("Earth");
    this.getImages("Earth");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
