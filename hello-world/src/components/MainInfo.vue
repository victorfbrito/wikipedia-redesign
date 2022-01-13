<template>
  <div id="main" v-if="content">
    <h1 class="title_xl primary">{{ content.title || "untitled" }}</h1>
    <p class="text_m secondary">{{ content.intro }}</p>
    <div v-for="(content, index) in content.topics" :key="index">
      <h2 class="title_l primary">{{ content.title || "untitled" }}</h2>
      <p class="text_m secondary" v-if="typeof content.content === 'string'">
        {{ content.content !== "" ? content.content : "---" }}
      </p>
      <div
        v-else
        v-for="(content, index) in content.content.topics"
        :key="index"
      >
        <h3 class="title_m primary">{{ content.title || "untitled" }}</h3>
        <p class="text_m secondary" v-if="typeof content.content === 'string'">
          {{ content.content !== "" ? content.content : "---" }}
        </p>
        <div
          v-else
          v-for="(content, index) in content.content.topics"
          :key="index"
        >
          <h4 class="subtitle primary">{{ content.title || "untitled" }}</h4>
          <p
            class="text_m secondary"
            v-if="typeof content.content === 'string'"
          >
            {{ content.content !== "" ? content.content : "---" }}
          </p>
          <div
            v-else
            v-for="(content, index) in content.content.topics"
            :key="index"
          >
            <h5 class="subtitle primary">{{ content.title || "untitled" }}</h5>
            <p
              class="text_m secondary"
              v-if="typeof content.content === 'string'"
            >
              {{ content.content !== "" ? content.content : "---" }}
            </p>
            <div
              v-else
              v-for="(content, index) in content.content.topics"
              :key="index"
            >
              <h6 class="subtitle primary">
                {{ content.title || "untitled" }}
              </h6>
              <p
                class="text_m secondary"
                v-if="typeof content.content === 'string'"
              >
                {{ content.content !== "" ? content.content : "---" }}
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