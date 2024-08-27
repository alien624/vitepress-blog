import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import type { ConfigOptions } from '../types/configOptions';

async function generateFeed(config: SiteConfig, configOptions: ConfigOptions) {
  const feed = new Feed({
    title: configOptions.title,
    description: configOptions.description,
    id: configOptions.hostname,
    link: configOptions.hostname,
    language: 'en',
    favicon: `${configOptions.hostname}/favicon.svg`,
    copyright:
      `Copyright (c) 2024-present, ${configOptions.author}`
  })

  const posts = await createContentLoader('src/*.md', {
    excerpt: true,
    render: true
  }).load()

  // Filter everything that's not of type `article` (e.g. index.md)
  const filteredPosts = posts.filter(post => post.frontmatter.type === 'article')

  filteredPosts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of filteredPosts) {
    // Remove `/src` from URL
    const fullUrl = `${configOptions.hostname}${url.replace(/^\/src/, '')}`

    // Strip `&ZeroWidthSpace;` from `html` string
    const content = html?.replace(/&ZeroWidthSpace;/g, '');

    feed.addItem({
      title: frontmatter.title,
      id: fullUrl,
      link: fullUrl,
      description: frontmatter.description,
      content: content,
      author: [
        {
          name: configOptions.author,
          email: configOptions.email,
          link: configOptions.hostname
        }
      ],
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}

export default generateFeed;