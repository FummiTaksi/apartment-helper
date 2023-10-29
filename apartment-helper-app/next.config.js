/** @type {import('next').NextConfig} */
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

module.exports = {
  webpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}
