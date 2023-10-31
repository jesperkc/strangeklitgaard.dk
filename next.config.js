/** @type {import('next').NextConfig} */
const path = require('path')

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
}

module.exports = nextConfig
