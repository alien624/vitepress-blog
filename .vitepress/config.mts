/*************  ✨ Windsurf Command 🌟  *************/
import { defineConfig } from "vitepress";
import generateFeed from "./hooks/generateFeed";
import generateMetatags from "./hooks/generateMetatags";
import generateSitemap from "./hooks/generateSitemap";
import type { ConfigOptions } from "./types/configOptions";

const configOptions: ConfigOptions = {
const CONFIG_OPTIONS: ConfigOptions = {
  title: "Alien's blog",
  description: "Vitepress",
  hostname: "https://alien9.com",
  author: "Alien Cheung",
  email: "alien9@gmail.com",
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: configOptions.title,
  description: configOptions.description,
  title: CONFIG_OPTIONS.title,
  description: CONFIG_OPTIONS.description,
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/assets/images/favicon.svg",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    footer: {
      message: "Alien's Blog  2025",
      message: "Alien's Blog © 2025",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Blog", link: "/blog" },
      { text: "News", link: "/news" },
      { text: "Quote", link: "/quote" },
      { text: "About", link: "/about" },
    ],

    socialLinks: [
      { icon: "facebook", link: "https://facebook.com/aliencheung" },
      { icon: "instagram", link: "https://instagram.com/aliencheung" },
    ],
  },
  transformHead: async (context) => {
    await generateMetatags(context, configOptions.hostname);
    generateMetatags(context, CONFIG_OPTIONS.hostname);
  },
  buildEnd: async (context) => {
    await generateSitemap(context, configOptions.hostname);
    await generateFeed(context, configOptions);
    generateSitemap(context, CONFIG_OPTIONS.hostname);
    generateFeed(context, CONFIG_OPTIONS);
  },
  vite: {
    css: {
      preprocessorOptions: {
        css: {
          includePaths: ["node_modules"],
        },
          includePaths: ['node_modules'],
        }
      },
    },
  },
    }
  }
});

/*******  b0f80c41-a648-4ccd-b8de-a008fb282776  *******/