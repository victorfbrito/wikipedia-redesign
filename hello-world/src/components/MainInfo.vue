<template>
  <div id="main">
    <!-- <div> -->
    {{ bb }}
    1.0
    <ul>
      2.0
      <li v-for="(topic, i) in body" :key="i">ae</li>
      <!-- <li v-for="(sub_topic, j) in topic" :key="j">
        {{ sub_topic }}
      </li> -->
    </ul>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "RandomInfo",
  props: ["content", "aeae"],
};
</script>

<style scoped>
</style>