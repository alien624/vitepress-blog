<script setup>
import { ref } from "vue";

const posts = ref([]);

async function loadPosts() {
  const entries = await fetch("api.alien9.com/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": env.API_KEY,
    },
  }).then((res) => res.json());
  posts.value = entries;
  console.log("posts", posts);
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
