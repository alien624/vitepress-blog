<script setup>
import { onMounted, ref } from "vue";
let quote = ref({});
const model = ref("@cf/openchat/openchat-3.5-0106");
const aiModels = ["@cf/meta/llama-3-8b-instruct-awq"];

async function postQuote() {
  quote.value = {}; // Reset quote before fetching a new one
  const quoteData = {
    model: model.value,
  };
  const resp = await fetch("https://quote.alien9.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteData),
  }).catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

  let data = await resp.json();

  try {
    data = JSON.parse(data);
  } catch (e) {
    console.log("parse json error!", e);
    postQuote();
  }
  console.log("get Quote successfully:", data);

  JSON.stringify(data);
  quote.value = data;
}

onMounted(() => {
  // Initial fetch or setup can be done here
  postQuote();
});
</script>
<template>
  <button @click="postQuote">Get Quote</button>
  <transition name="fade" mode="out-in">
    <div v-if="quote.quote">
      <template v-if="quote.field">
        <h2>{{ quote.field }}</h2>
      </template>
      <blockquote>
        <p>{{ quote.quote }}</p>
        <cite>
          <template v-if="quote.author && quote.author_url">
            -
            <a :href="quote.author_url" target="_blank"> {{ quote.author }}</a>
          </template>
          <template v-else-if="quote.author"> - {{ quote.author }} </template>
          <template v-if="quote.collection && quote.collection_url">
            ,
            <a :href="quote.collection_url" target="_blank">{{
              quote.collection
            }}</a>
          </template>
          <template v-else-if="quote.collection">
            , {{ quote.collection }}
          </template>
          <template v-if="quote.creation_date">
            , {{ quote.creation_date }}</template
          >
        </cite>
      </blockquote>
      <template v-if="quote.meaning"> {{ quote.meaning }}</template>
    </div>
  </transition>
</template>
