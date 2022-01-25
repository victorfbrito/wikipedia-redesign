import { reactive } from "vue";

export var store = {
  debug: true,
  state: reactive({
    language: 'en'
  }),
  setLanguage (newValue) {
    if (this.debug) console.log('setLanguage triggered with', newValue)
    this.state.language = newValue
  }
}