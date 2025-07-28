// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import BlogPostList from "./components/page/BlogPostList.vue";
import NewsList from "./components/page/NewsList.vue";
import QuoteList from "./components/page/QuoteList.vue";
import AboutPage from "./components/page/AboutPage.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component("BlogPostList", BlogPostList);
    app.component("NewsList", NewsList);
    app.component("QuoteList", QuoteList);
    app.component("AboutPage", AboutPage);
  },
} satisfies Theme;
