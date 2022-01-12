<template>
  <div id="main" v-if="content">
    <h1>{{ content.title || "untitled" }}</h1>
    <p>{{ content.intro }}</p>
    <div v-for="(content, index) in content.topics" :key="index">
      <h2>h2: {{ content.title || "untitled" }}</h2>
      <p v-if="typeof content.content === 'string'">{{ content.content }}</p>
      <div
        v-else
        v-for="(content, index) in content.content.topics"
        :key="index"
      >
        <h3>h3: {{ content.title || "untitled" }}</h3>
        <p v-if="typeof content.content === 'string'">
          {{ content.content }}
        </p>
        <div
          v-else
          v-for="(content, index) in content.content.topics"
          :key="index"
        >
          <h4>h4: {{ content.title || "untitled" }}</h4>
          <p v-if="typeof content.content === 'string'">
            {{ content.content }}
          </p>
          <div
            v-else
            v-for="(content, index) in content.content.topics"
            :key="index"
          >
            <h5>h5: {{ content.title || "untitled" }}</h5>
            <p v-if="typeof content.content === 'string'">
              {{ content.content }}
            </p>
            <div
              v-else
              v-for="(content, index) in content.content.topics"
              :key="index"
            >
              <h6>h6: {{ content.title || "untitled" }}</h6>
              <p v-if="typeof content.content === 'string'">
                {{ content.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RandomInfo",
  props: ["content"],
};
</script>

<style scoped>
</style>