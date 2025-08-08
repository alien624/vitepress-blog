<script setup>
import { ref } from "vue";

const posts = ref([]);

async function loadPosts() {
  const entries = await fetch("https://api.alien9.com/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": import.meta.env.API_KEY,
    },
  }).then((res) => {
    console.log("res", res);
    return res.json();
  });
  posts.value = entries;
  console.log("posts", posts.value);
}

loadPosts();
</script>

<template>
  <transition name="fade" mode="out-in" appear>
    <ul>
      <li v-for="post in posts" :key="post.link">
        {{ post.title }}
        <!-- <a :href="post.link">
          {{ post.title }} -
          <em>
            {{ new Date(post.date).toLocaleDateString("en-US") }}
          </em>
        </a> -->
      </li>
    </ul>
  </transition>
</template>
