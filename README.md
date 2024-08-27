# Vitepress Blog Starter Template

A simple template that uses the default vitepress theme bug with a little tweaks. I wanted one to make my own blog, but I did not find any, so I made mine! Feel free to copy anything since everything I did here is very simple and basic. 

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
Has all the config for vitepress, including the config file, the theme style and custom components. If you want to add a new component, I suggest you add accordantly with the functionallity you want to add (i.e: if you want to add a blog list pagination, add that to `/components/blog`)

``/blog``
Contains all the blog posts that will be rendered by the ``BlogPostList`` component

## Routing
Vitepress sets its routing based on the file structure, so if you want a new route based on the root page, just create that in the root folder of you project (i.e: create an ``about.md`` if you want to add an about page)

## Configuring

At .vitepress/config.mts there is a CONFIG_OPTIONS constant that serves all the other features (except robots.txt) about the information about you and your blog. To ensure you customize it with your data, you have to change that constant.
Other than that, you should also change the favicon, setting your own and changing the file at public/assets/images and it correspondant name/extension at config.mts head property that links to the favicon.
