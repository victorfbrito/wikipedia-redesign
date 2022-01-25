<template>
  <div id="main" class="carroussel">
    <button v-for="(item, index) in options" :key="index" class="button secondary">
      <img class="icon" :src="item.icon" />
      <!-- <p class="text_s title">{{ item.title }}</p> -->
    </button>
  </div>
</template>

<script>
import TranslateIcon from "../assets/translate_icon.svg";
import AudioIcon from "../assets/audio_icon.svg";
import ShareIcon from "../assets/share_icon.svg";
import FontIcon from "../assets/font_icon.svg";

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
          type: "typography",
          title: "Typography",
          icon: FontIcon,
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
    position: absolute;
    left: 0;
    margin-left: var(--size10);
    /* right: calc(100% + var(--size3)); */
    display: flex;
    flex-direction: column;
    gap: var(--size1);
}

.button {
  background-color: transparent;
  border-radius: 50%;
  border: 1px solid;
  width: var(--size6);
  height: var(--size6);
}

.button:hover {
  opacity: 1;
  cursor: pointer;
  box-shadow: 0px 0px 4px var(--secondary);
}

.icon {
  width: var(--size2);
  height: var(--size2);
}

.title {
  margin: 0;
}
</style>