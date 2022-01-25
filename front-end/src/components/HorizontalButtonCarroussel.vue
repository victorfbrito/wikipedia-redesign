<template>
  <div id="main" class="carroussel">
    <button v-for="(item, index) in options" :key="index" class="button base">
      <img class="icon" :src="item.icon" />
      <p class="text_s title">{{ item.title }}</p>
    </button>
  </div>
</template>

<script>
import TranslateIcon from "../assets/translate_icon_white.svg";
import AudioIcon from "../assets/audio_icon_white.svg";
import ShareIcon from "../assets/share_icon_white.svg";

export default {
  name: "BigButtonCarroussel",
  data() {
    return {
      options: [
        {
          type: "translation",
          title: "Translate",
          icon: TranslateIcon,
        },
        {
          type: "audio",
          title: "Audio",
          icon: AudioIcon,
        },
        {
          type: "share",
          title: "Share",
          icon: ShareIcon,
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style scoped>
.carroussel {
  display: flex;
  flex-direction: row;
  gap: var(--size2);
  margin-top: var(--size2);
}

.button {
  /* opacity: 0.6; */
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid;
  width: var(--size10);
  height: var(--size10);
}

.button:hover {
  opacity: 1;
  cursor: pointer;
  box-shadow: 0px 0px 4px var(--base);
}

.icon {
  width: var(--size3);
  height: var(--size3);
}

.title {
  margin: 0;
}
</style>