const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const plugins = [];

plugins.push(withBundleAnalyzer);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.discordapp.com']
  },
  compiler: {
    styledComponents: true,
  }
}

module.exports = withPlugins(plugins, nextConfig);