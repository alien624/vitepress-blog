<script setup>
import { ref } from "vue";

const posts = ref([]);

const postModules = import.meta.glob("/blog/*.md");

async function loadPosts() {
  const entries = await Promise.all(
    Object.keys(postModules).map(async (path) => {
      const module = await postModules[path]();

      return {
        title: module.__pageData.title,
        date: module.__pageData.frontmatter.date,
        link: path.replace(/^\/docs/, "").replace(/\.md$/, ""),
      };
    })
  );

  posts.value = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

loadPosts();
</script>

<template>
  <transition name="fade" mode="out-in" appear>
    <ul>
      <li v-for="post in posts" :key="post.link">
        <a :href="post.link">
          {{ post.title }} -
          <em>
            {{ new Date(post.date).toLocaleDateString("en-US") }}
          </em>
        </a>
      </li>
    </ul>
  </transition>
</template>
