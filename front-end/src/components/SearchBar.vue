<template>
  <div id="main">
    <div class="search_bar_container">
      <input
        ref="search_input"
        class="search_input"
        v-model="search_term"
        placeholder="Search"
        @click="showPopup = !showPopup"
      />
      <ul class="results_box"
        v-show="showPopup"
        v-closable="{
          handler: 'onClose'
        }"
        v-if="results"
      >
        <li
          v-for="(result, index) in results"
          :tabindex="index"
          class="result"
          :key="index"
          v-on:click="redirectTo(result.url)"
        >
          {{ result.name }}
        </li>
      </ul>
    </div>
    <span class="outside_container"
      v-show="showPopup"
      @click="showPopup = false"
      v-closable="{
        handler: 'onClose'
    }"/>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
// import LoadingSpinner from "./LoadingSpinner.vue";
import { search_api } from "../core/api.js";

export default {
  // components: { LoadingSpinner },
  name: "SearchBar",
  data() {
    return {
      search_term: null,
      isLoading: false,
      results: null,
      showPopup: false
    };
  },
  methods: {
    onClose() {
      this.showPopup = false
    },
    async searchFor(query) {
      this.isLoading = true;
      if (query.length > 0) {
        try {
          const params = {
            origin: "*",
            action: "opensearch",
            format: "json",
            search: query,
            namespace: "0",
          };
          await axios.get(search_api, { params }).then((res) => {
            let responses = [];
            for (let i = 0; i < res.data[1].length; i++) {
              responses.push({
                name: res.data[1][i],
                url: res.data[3][i].split("wikipedia.org/wiki/").pop(),
              });
            }
            console.log('new results: '), responses
            this.results = responses;
            this.isActive = true;
          });
        } catch {
          alert("error");
        }
      } else {
        this.results = null;
      }
      this.isLoading = false;
    },
    redirectTo: function (e) {
      this.showPopup = false;
      this.$router.push({ name: "Article", params: { subject: e } });
    }
  },
  watch: {
    search_term: _.debounce(function (query) {
      this.searchFor(query);
    }, 250),
  },
};
</script>

<style scoped>

.outside_container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left:0;
  top:0;
  z-index: 5;
}

.loading_container {
  display: flex;
  justify-content: center;
  height: var(--size6);
}

.results_box {
  position: absolute;
  border: 2px solid var(--base);
  border-radius: 0 0 0.375rem 0.375rem;
  padding: var(--size2) 1px 0 1px;
  right: 0;
  overflow: hidden;
  top: 0;
  outline: none;
  color: var(--secondary);
  background-color: var(--base);
  width: calc(var(--size10) * 2.5);
  z-index: 6;
}

.search_input {
  height: calc(var(--size2) * 1.5);
  width: calc(var(--size10) * 2.5);
  border-radius: 25px;
  padding: 0 var(--size1);
  outline: none;
  border: 1px solid var(--base);
  z-index: 7;
  color: var(--secondary);
  background-color: var(--base);
}

.search_bar_container {
  position: relative;
  display: flex;
  align-items: center;
}

.result {
  padding: var(--size1);
}

.result:hover {
  cursor: pointer;
  color: var(--base);
  background-color: var(--wikiblue);
}
</style>