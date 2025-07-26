# Vitepress Blog Starter Template

A simple template that uses the default Vitepress theme but with a few tweaks. I wanted to make my blog with Vitepress, but I did not find any template similar to this, so I made mine! Feel free to copy anything since everything I did here is very simple and basic. A special thanks to [Paul Laros](https://laros.io/), who wrote insightful articles on generating RSS feeds, metatags, and sitemaps in a VitePress project. I added the blog post listing and made a few other configurations, but my goal was to keep this project as clean and straightforward as possible so others could easily customize it to their needs.
Feel free to reach me if you need any help, and I strongly recommend reading Vitepress docs or opening a Q&A discussion at their repository.

## Setup

``npm install``

## Development

``npm run dev``

## Build

``npm run build``

and then

``npm run serve``

## File structure

``.vitepress``
Has all the config for Vitepress, including the config file, the theme style, and custom components. If you want to add a new component, I suggest you add accordantly to the functionality you want to add (i.e: if you want to add a blog list pagination, add that to `/components/blog`)

``/blog``
Contains all the blog posts that will be rendered by the ``BlogPostList`` component

## Routing
Vitepress sets its routing based on the file structure, so if you want a new route based on the root page, just create that in the root folder of your project (i.e: create an ``about.md`` if you want to add an about page)

## Configuring

At .vitepress/config.mts there is a CONFIG_OPTIONS constant that serves all the other features (except robots.txt) about the information about you and your blog. To ensure you customize it with your data, you have to change that constant.
Other than that, you should also change the favicon, setting your own and changing the file at public/assets/images and its corresponding name/extension at config.mts head property that links to the favicon.

## Deploy
``npx vitepress build``
