<template>
  <div id="main" class="search_bar_container">
    <input
      class="search_input"
      v-model="search_term"
      placeholder="Search"
      @focus="isActive"
    />
    <ul class="results_box" v-if="isActive">
      <li class="loading_container" v-if="isLoading">
        <loading-spinner />
      </li>
      <li
        v-else
        v-for="(result, index) in results"
        v-click-outside="hide"
        class="result"
        :key="index"
        v-on:click="redirectTo(result.url)"
      >
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import LoadingSpinner from "./LoadingSpinner.vue";
import { search_api } from "../core/api.js";

export default {
  components: { LoadingSpinner },
  name: "SearchBar",
  data() {
    return {
      search_term: null,
      isLoading: false,
      results: null,
      isActive: false,
    };
  },
  methods: {
    searchFor(query) {
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
          axios.get(search_api, { params }).then((res) => {
            let responses = [];
            for (let i = 0; i < res.data[1].length; i++) {
              responses.push({
                name: res.data[1][i],
                url: res.data[3][i].split("wikipedia.org/wiki/").pop(),
              });
            }
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
      this.$router.push({ name: "Article", params: { subject: e } });
    },
    clearSearch() {
      this.results = null;
    },
  },
  watch: {
    search_term: _.debounce(function (query) {
      this.searchFor(query);
    }, 250),
  },
};
</script>

<style scoped>
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
}

.search_input {
  height: calc(var(--size2) * 1.5);
  width: calc(var(--size10) * 2.5);
  border-radius: 25px;
  padding: 0 var(--size1);
  outline: none;
  border: 1px solid var(--base);
  z-index: 1;
  color: var(--secondary);
  background-color: var(--base);
}

.search_bar_container {
  position: relative;
  display: flex;
  align-items: center;
}

.search_bar_container:after {
  position: absolute;
  right: 0;
  display: block;
  content: " ";
  height: var(--size1);
  width: var(--size1);
  margin-right: var(--size1);
  background-image: url("../assets/search_icon.svg");
  background-size: var(--size1);
  background-repeat: no-repeat;
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