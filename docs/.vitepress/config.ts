import { defineConfig, DefaultTheme } from 'vitepress'

const ogDescription = 'A new way to write Component Usage.'
const ogTitle = 'VitDoc'
const ogUrl = 'https://xiaobebe.github.io/vitdoc'

// netlify envs
// @ts-ignore
const deployURL = process.env.DEPLOY_PRIME_URL || ''
// @ts-ignore
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'


export default defineConfig({
  title: `VitDoc`,
  description: 'Next Generation Frontend Tooling',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
  ],

  vue: {
    reactivityTransform: true
  },

  themeConfig: {
    logo: '/logo.svg',



    // algolia: {
    //   appId: 'C80US3TG80',
    //   apiKey: 'f4101dc89097dad4306135260a64e531',
    //   indexName: 'VitDoc',
    //   // searchParameters: {
    //   //   facetFilters: ['tags:en']
    //   // }
    // },

    footer: {
      message: `Released under the MIT License. (${commitRef})`,
      copyright: 'Copyright © 2019-present'
    },

    // nav: [
    //   { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
    //   { text: 'Config', link: '/config/', activeMatch: '/config/' },
    // ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            {
              text: 'Why VitDoc',
              link: '/guide/why'
            },
            {
              text: 'Getting Started',
              link: '/guide/'
            },
          ]
        },
      ],
      '/config/': [
        {
          text: 'Config',
          items: [
            {
              text: 'Configuring VitDoc',
              link: '/config/'
            },
            {
              text: 'Shared Options',
              link: '/config/shared-options'
            },
            {
              text: 'Server Options',
              link: '/config/server-options'
            },
            {
              text: 'Build Options',
              link: '/config/build-options'
            },
            {
              text: 'Preview Options',
              link: '/config/preview-options'
            },
            {
              text: 'Dep Optimization Options',
              link: '/config/dep-optimization-options'
            },
            {
              text: 'SSR Options',
              link: '/config/ssr-options'
            },
            {
              text: 'Worker Options',
              link: '/config/worker-options'
            }
          ]
        }
      ]
    }
  }
})
