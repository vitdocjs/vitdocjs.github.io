import { defineConfig, DefaultTheme } from "vitepress";

const ogDescription = "A new way to write Component Usage.";
const ogTitle = "VitDoc";
const ogUrl = "https://vitdocjs.github.io";

export default defineConfig({
  locales: {
    "/": {
      lang: "zh-CN",
      title: `VitDoc`,
      description: "基于Vite的组件开发生产力工具",
    },
    "/en": {
      lang: "en-US",
      title: `VitDoc`,
      description: "A new way to write Component Usage.",
    },
  },

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: ogTitle }],
    ["meta", { property: "og:url", content: ogUrl }],
    ["meta", { property: "og:description", content: ogDescription }],
  ],




  themeConfig: {
    logo: "/logo.svg",

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vitdocjs/vitdoc' }
    ],

    algolia: {
      appId: 'C80US3TG80',
      apiKey: 'f4101dc89097dad4306135260a64e531',
      indexName: 'VitDoc',
      // searchParameters: {
        // facetFilters: ['tags:en']
      // }
    },

    footer: {
      message: `Released under the MIT License.`,
      copyright: "Copyright © 2019-present",
    },

    nav: [
      { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
      { text: "Config", link: "/config/", activeMatch: "/config/" },
    ],

    localeLinks: {
      text: "",
      items: [
        { text: "简体中文", link: "/" },
        { text: "English", link: "/en/" },
      ],
    },

    sidebar: {
      "/": [
        {
          text: "指引",
          items: [
            {
              text: "介绍",
              link: "/guide/introduction",
            },
            {
              text: "快速上手",
              link: "/guide/",
            },
          ],
        },
        {
          text: "配置",
          items: [
            {
              text: "配置项",
              link: "/config/",
            },
            {
              text: "FrontMatter",
              link: "/config/frontmatter",
            },
          ],
        },
      ],
    },
  },
});
