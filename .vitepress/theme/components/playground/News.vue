<script setup>
import { ref } from 'vue'

const newses = ref([])

const newsModules = {
  "news": [
    {
      title: "Latest News",
      date: "2023-10-01",
      link: "/news/latest-news"
    },
    {
      title: "Tech Updates",
      date: "2023-09-15",
      link: "/news/tech-updates"
    },
    {
      title: "Community Events",
      date: "2023-08-20",
      link: "/news/community-events"
    }
  ]
}

async function loadNews() {
  const entries = await Promise.all(
    Object.keys(newsModules).map(async (path) => {
      const module = newsModules[path];

      return module.map(item => ({
        title: item.title,
        date: item.date,
        link: item.link
      }));
    })
  );

  newses.value = entries.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
}


loadNews()
</script>

<template>
  <ul>
    <li v-for="news in newses" :key="news.link">
      <a :href="news.link">
        {{ news.title }} -
        <em>
          {{ news.date ? new Date(news.date).toLocaleDateString('en-US') : 'No date available' }}
        </em>
      </a>
    </li>
  </ul>
</template>
