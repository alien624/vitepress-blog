<script setup>
import { ref, computed } from "vue";

const blogList = ref([]);
const pagination = ref({
  page: 1,
  itemsPerPage: 6,
  totalCount: 1,
});

async function loadPosts(page = 1) {
  try {
    blogList.value = [];

    const params = new URLSearchParams({
      page: pagination.value.page,
      pageSize: pagination.value.itemsPerPage,
      category: "technology",
    });

    const url = `https://api.alien9.com/blogs?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": import.meta.env.VITE_API_KEY,
      },
    });

    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      return;
    }

    const data = await response.json();
    if (data.success) {
      blogList.value = data.result;
      pagination.value.totalCount = data.result_info.total_count;
      pagination.value.itemsPerPage = data.result_info.per_page;
      pagination.value.page = data.result_info.page;
    } else {
      console.error("API failed:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

loadPosts();

const blogs = computed(() => {
  return blogList.value.map((item) => {
    return {
      id: item.id,
      title: item.title,
      content: item.content,
      created_at: item.created_at,
    };
  });
});
</script>

<style>
div.vp-doc ul {
  list-style: none;
}
</style>

<template>
  <transition name="fade" mode="out-in">
    <v-container v-if="blogs.length > 0" :key="pagination.page">
      <template v-for="item in blogs" :key="item.id">
        <v-card class="mb-4" v-ripple>
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>
            {{ item.content }}
          </v-card-text>
          <span class="text-caption" style="float: right; padding: 1rem">
            {{ item.created_at }}
          </span>
        </v-card>
      </template>
    </v-container>
  </transition>
  <v-pagination
    v-if="pagination.totalCount > pagination.itemsPerPage"
    v-model="pagination.page"
    :length="Math.ceil(pagination.totalCount / pagination.itemsPerPage)"
    :total-visible="5"
    @input="loadPosts"
  ></v-pagination>
</template>
