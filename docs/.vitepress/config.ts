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

  vue: {
    reactivityTransform: true,
  },

  themeConfig: {
    logo: "/logo.svg",

    // algolia: {
    //   appId: 'C80US3TG80',
    //   apiKey: 'f4101dc89097dad4306135260a64e531',
    //   indexName: 'VitDoc',
    //   // searchParameters: {
    //   //   facetFilters: ['tags:en']
    //   // }
    // },

    footer: {
      message: `Released under the MIT License.`,
      copyright: "Copyright © 2019-present",
    },

    nav: [
      { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
      // { text: "Config", link: "/config/", activeMatch: "/config/" },
    ],

    localeLinks: {
      text: "",
      items: [
        { text: "简体中文", link: "/" },
        { text: "English", link: "/en/" },
      ],
    },

    sidebar: {
      "/guide/": [
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
      ],
      "/config/": [
        {
          text: "Config",
          items: [
            {
              text: "Configuring VitDoc",
              link: "/config/",
            },
            {
              text: "Shared Options",
              link: "/config/shared-options",
            },
            {
              text: "Server Options",
              link: "/config/server-options",
            },
            {
              text: "Build Options",
              link: "/config/build-options",
            },
            {
              text: "Preview Options",
              link: "/config/preview-options",
            },
            {
              text: "Dep Optimization Options",
              link: "/config/dep-optimization-options",
            },
            {
              text: "SSR Options",
              link: "/config/ssr-options",
            },
            {
              text: "Worker Options",
              link: "/config/worker-options",
            },
          ],
        },
      ],
    },
  },
});
