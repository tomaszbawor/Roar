import Toast, { PluginOptions, POSITION } from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  // Default options
  position: POSITION.BOTTOM_RIGHT,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
