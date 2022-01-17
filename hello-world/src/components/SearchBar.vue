<template>
  <div id="main" class="search_bar_container">
    <div class="search_bar">
      <input
        class="search_input bordered"
        v-model="search_term"
        placeholder="Search"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: [],
  data() {
    return {
      search_term: "",
    };
  },
};
</script>

<style scoped>
.search_input {
  position: absolute;
  right: calc(var(--size1) / 2);
  border: none;
  border-radius: 25px;
  height: 0;
  width: 0;
  padding: 0 var(--size1);
  transition: height 0.1s, width 0.5s, right 0.1s;
}

.search_bar:hover .search_input {
  height: calc(var(--size2) * 1.5);
  width: calc(var(--size10) * 3);
  right: 0;
}

.search_bar {
  position: relative;
  display: flex;
  align-items: center;
}

.search_bar:after {
  display: block;
  content: " ";
  height: calc(var(--size2) * 1.2);
  width: calc(var(--size2) * 1.2);
  margin-right: calc(var(--size1) / 3.2);
  background-image: url("../assets/circled_search_icon.svg");
  background-size: calc(var(--size2) * 1.2);
  z-index: 1;
}
</style>