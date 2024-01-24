/** @type {import('next').NextConfig} */
const path = require('path')
const withMDX = require('@next/mdx')()

const nextConfig = {
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app')],
  },
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      // use: ['@svgr/webpack'],
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      cleanupIds: false,
                      removeViewBox: false,
                    },
                  },
                },
                'removeXMLNS',
              ],
            },
          },
        },
      ],
    })
    return config
  },
}

module.exports = withMDX(nextConfig)
