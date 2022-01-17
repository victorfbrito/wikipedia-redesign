<template>
  <div id="main" class="search_bar_container" v-click-outside="hide">
      <input
        class="search_input"
        :class="isActive ? 'active_input' : 'disabled_input'"
        v-model="search_term"
        placeholder="Search"
        @focus="isActive = true"
        @blur="isActive = false"
      />
      <div class="results_box" v-if="isActive">
        <div class="loading_container" v-if='isLoading'>
          <loading-spinner /> 
        </div>
        <div v-else v-for="(result, index) in results" class="result" :key="index">{{result.name}}</div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from 'lodash';
import LoadingSpinner from './LoadingSpinner.vue';


var lng = "pt";
var url = "https://" + lng + ".wikipedia.org/w/api.php";

export default {
  components: { LoadingSpinner },
  name: "SearchBar",
  data() {
    return {
      search_term: null,
      isLoading: false,
      results: null,
      isActive: false
    };
  },
  methods: {
    searchFor(query) {
      this.isLoading = true
      if (query.length > 0) {
        try {
          const params = {
            origin: "*",
            action: "opensearch",
            format: "json",
            search: query,
            namespace: "0",
          }
          axios.get(url, { params }).then((res) => {
            let responses = []
            for (let i = 0; i < res.data[1].length; i++) {
              responses.push({name: res.data[1][i], url: res.data[3][i]})
            }
            this.results = responses
            this.isActive = true
          })
        } catch {
          alert('error')
        }
      } else {
        this.results = null
      }
      this.isLoading = false
    },
    show: function() {
      this.isActive = true;
    },
    hide: function() {
      this.isActive = false;
    }
  },
  watch: {
    search_term:  _.debounce(function(query) {
      this.searchFor(query);
    }, 250)
  }
}
</script>

<style scoped>
.loading_container {
display: flex;
justify-content: center;
height: var(--size6)}
.active_input {  
  opacity: 1;
  height: calc(var(--size2) * 1.5);
  width: calc(var(--size10) * 2.5);
}

.disabled_input {
  height: calc(var(--size2) * 1.5);
  width: calc(var(--size4));
  opacity: 0;
}

.results_box{
  position: absolute;
  right: calc(var(--size1) / 2);
  border: none;
  border-radius: 25px;
  padding: 0 1px;
  padding-top: calc(var(--size2) * 1.5);
  right: 0;
  overflow:hidden;
  top: 0;
  outline: none;
  background-color: rgba(255, 255, 255, 0.253);
  width: calc(var(--size10) * 2.5);
}

.search_input {
  z-index: 5;
  position: absolute;
  right: calc(var(--size1) / 2);
  border: none;
  border-radius: 25px;
  padding: 0 var(--size1);
  right: 0;
  transition: height 0.1s, width 0.5s, right 0.1s, opacity 0.5s;
  outline: none;
}

.search_input:focus-visible {
  border: 1px solid var(--secondary);
}

.search_bar_container:hover .search_input {
  height: calc(var(--size2) * 1.5);
  width: calc(var(--size10) * 2.5);
  opacity: 1;
}

.search_bar_container {
  position: relative;
  display: flex;
  align-items: center;
}

.search_bar_container:after {
  display: block;
  content: " ";
  height: calc(var(--size2) * 1.2);
  width: calc(var(--size2) * 1.2);
  margin-right: calc(var(--size1) / 3.2);
  background-image: url("../assets/circled_search_icon.svg");
  background-size: calc(var(--size2) * 1.2);
  z-index: 1;
}

.result {
  padding: var(--size1)
}

.result:hover{
  cursor: pointer;
  background-color: var(--wikiblue)
}
</style>