<template>
  <div id="main" class="container">
    <div
      class="action_button subtitle"
      v-for="(option, index) in options"
      :key="index"
    >
      <div class="submenu_button" v-if="option.subcategories.length > 0">
        {{ option.name }}
      </div>
      <div class="redirect_button" v-else>{{ option.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WikiHeaderRedirects",
  props: [],
  components: [],
  data() {
    return {
      options: [
        { name: "Home", url: "wikipedia.com", subcategories: [] },
        { name: "Best articles", url: "wikipedia.com", subcategories: [] },
        {
          name: "Categories",
          url: "wikipedia.com",
          subcategories: [
            { name: "SubCategory 1", url: "wikipedia.com" },
            { name: "SubCategory 2", url: "wikipedia.com" },
            { name: "SubCategory ", url: "wikipedia.com" },
          ],
        },
        {
          name: "Community",
          url: "wikipedia.com",
          subcategories: [{ name: "SubCategory 1", url: "wikipedia.com" }],
        },
        { name: "Store", url: "wikipedia.com", subcategories: [] },
        {
          name: "About",
          url: "wikipedia.com",
          subcategories: [
            { name: "SubCategory 1", url: "wikipedia.com" },
            { name: "SubCategory 2", url: "wikipedia.com" },
            { name: "SubCategory 3", url: "wikipedia.com" },
            { name: "SubCategory 4", url: "wikipedia.com" },
          ],
        },
        { name: "Help", url: "wikipedia.com", subcategories: [] },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  gap: var(--size1);
}

.action_button {
  text-align: center;
  display: flex;
  align-items: center;
}

.submenu_button {
  height: 100%;
  width: 100%;
  padding: 0 var(--size1);
  display: flex;
  align-items: center;
  gap: calc(var(--size1) / 2);
}

.submenu_button:after {
  display: block;
  content: " ";
  background-repeat: no-repeat;
  background-image: url("../assets/arrow.svg");
  background-size: calc(var(--size1) / 2);
  height: calc(var(--size1) / 2);
  width: calc(var(--size1) / 2);
}

.submenu_button:hover:after {
  transition: 0.2s;
  transform: rotateX(180deg) translateY(50%);
}

.redirect_button {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0 var(--size1);
}

.redirect_button:hover {
  text-shadow: 0 2px 12px #ffffff;
  cursor: pointer;
}
</style>