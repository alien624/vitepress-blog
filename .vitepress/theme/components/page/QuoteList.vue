<script setup>
import { onMounted, ref } from "vue";
async function postQuote(quoteData) {
  // Function to post a quote, api /quotes
  // Implementation will go here
  console.log("Posting quote...");
  const resp = await fetch("https://quote.alien9.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteData),
  }).catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

  const data = await resp.json();

  return data;
}

// Post the quote data
let quotes = ref([]);
onMounted(() => {
  postQuote()
    .then((data) => {
      data = JSON.parse(data);
      console.log("Quote posted successfully:", data);
      quotes.value.push(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  console.log("Quotes:", quotes);
});
</script>
<template>
  <transition name="fade" mode="out-in" appear>
    <ul v-if="quotes && quotes.length > 0">
      <li v-for="quote in quotes">
        <blockquote>
          <p>{{ quote.quote }}</p>
          <footer>
            <cite
              >{{ quote.name }},
              <a :href="quote.url">{{ quote.source }}</a></cite
            >
          </footer>
        </blockquote>
      </li>
    </ul>
  </transition>
</template>
