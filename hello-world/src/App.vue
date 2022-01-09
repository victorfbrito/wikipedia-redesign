<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <MainInfo :content="content" :bb="aeae" />
    <ul v-for="(topic, i) in content" :key="i">
      <li>{{ Object.keys(content)[0] }}</li>
      <li v-for="(topic, i) in content" :key="i">aa</li>
    </ul>
    <!-- <RandomInfo :body="fact" /> -->
  </div>
</template>

<script>
// import RandomInfo from "./components/RandomInfo.vue";
import MainInfo from "./components/RandomInfo.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    // RandomInfo,
    MainInfo,
  },
  data() {
    return {
      fact: "teste",
      content: {},
      aeae: "uhuhu",
    };
  },
  methods: {},
  mounted() {
    axios
      .get(
        "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=Pedro_II_of_Brazil&explaintext=1&exsectionformat=wiki&origin=*"
      )
      .then((res) => {
        let raw_text =
          res.data.query.pages[Object.keys(res.data.query.pages)[0]].extract;

        raw_text = raw_text.replaceAll("===", "=h3=").replaceAll("==", "=h2=");

        raw_text = raw_text.split("=h2=");
        raw_text = raw_text.map((e) => e.trim());
        raw_text.shift();

        let obj_text = {};
        for (let i = 0; i < raw_text.length; i += 2) {
          obj_text[raw_text[i]] = {};

          const raw_inner_text = raw_text[i + 1]
            .split("=h3=")
            .filter((e) => e.trim());

          for (let j = 0; j < raw_inner_text.length; j += 2) {
            obj_text[raw_text[i]][raw_inner_text[j].trim()] =
              raw_inner_text[j + 1];
          }
        }
        this.content = obj_text;
      });
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
