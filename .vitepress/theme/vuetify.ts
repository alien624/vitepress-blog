// .vitepress/theme/vuetify.ts
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  ssr: true,
  components,
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#FF0099",
          secondary: "#9900FF",
        },
      },
    },
  },
});
