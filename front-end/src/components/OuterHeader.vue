<template>
  <div class="outer-header">
    <div class="change-language dropdown_menu">EN-English</div>
    <ul class="option-list">
        <li class="option">Account</li>
        <li class="option">Community</li>
        <li class="option">Donate</li>
    </ul>
  </div>
</template>

<script>
import { store } from '../shared/store'

export default {
  name: "OuterHeader",
  props: [],
  data() {
    return {
      language: store.state.language,
    };
  },
  methods: {
    changeLanguage(new_lng) {
      store.setLanguage(new_lng)
    },
  }
};
</script>

<style scoped>
.outer-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--size3);
  padding: var(--size1) var(--app-margin);
  border-bottom: 1px solid var(--secondary);
}

.change-language {
  display: flex;
  align-items: center;
  gap: var(--size1);
  cursor: default;
}

.option-list {
  display: flex;
  list-style-type: none;
  gap: var(--size2);
}

.option:hover {
  cursor: pointer;
  font-weight: bold;
}
</style>