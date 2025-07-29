<script setup>
import { onMounted, ref } from "vue";
let quote = ref({});
const failAiSet = ref(new Set());

const model = ref("@cf/meta/llama-3.2-1b-instruct");
const aiModels = [
  "@cf/meta/llama-2-7b-chat-int8",
  "@cf/mistral/mistral-7b-instruct-v0.1",
  "@cf/meta/llama-2-7b-chat-fp16",
  "@hf/thebloke/llama-2-13b-chat-awq",
  "@hf/thebloke/zephyr-7b-beta-awq",
  "@hf/thebloke/openhermes-2.5-mistral-7b-awq",
  "@hf/thebloke/neural-chat-7b-v3-1-awq",
  "@hf/thebloke/llamaguard-7b-awq",
  "@hf/thebloke/deepseek-coder-6.7b-instruct-awq",
  "@cf/deepseek-ai/deepseek-math-7b-instruct",
  "@cf/defog/sqlcoder-7b-2",
  "@cf/openchat/openchat-3.5-0106",
  "@cf/tiiuae/falcon-7b-instruct",
  "@cf/thebloke/discolm-german-7b-v1-awq",
  "@cf/qwen/qwen1.5-0.5b-chat",
  "@cf/qwen/qwen1.5-7b-chat-awq",
  "@cf/qwen/qwen1.5-14b-chat-awq",
  "@cf/tinyllama/tinyllama-1.1b-chat-v1.0",
  "@cf/microsoft/phi-2",
  "@cf/qwen/qwen1.5-1.8b-chat",
  "@cf/mistral/mistral-7b-instruct-v0.2-lora",
  "@hf/nousresearch/hermes-2-pro-mistral-7b",
  "@hf/nexusflow/starling-lm-7b-beta",
  "@hf/google/gemma-7b-it",
  "@cf/meta-llama/llama-2-7b-chat-hf-lora",
  "@cf/google/gemma-2b-it-lora",
  "@cf/google/gemma-7b-it-lora",
  "@hf/mistral/mistral-7b-instruct-v0.2",
  "@cf/meta/llama-3-8b-instruct",
  "@cf/fblgit/una-cybertron-7b-v2-bf16",
  "@cf/meta/llama-3-8b-instruct-awq",
  "@hf/meta-llama/meta-llama-3-8b-instruct",
  "@cf/meta/llama-3.1-8b-instruct",
  "@cf/meta/llama-3.1-8b-instruct-fp8",
  "@cf/meta/llama-3.1-8b-instruct-awq",
  "@cf/meta/llama-3.2-3b-instruct",
  "@cf/meta/llama-3.2-1b-instruct",
  "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
  "@cf/facebook/bart-large-cnn",
  "@cf/llava-hf/llava-1.5-7b-hf",
  "@cf/baai/bge-base-en-v1.5",
  "@cf/openai/whisper",
  "@cf/meta/m2m100-1.2b",
  "@cf/baai/bge-small-en-v1.5",
  "@cf/baai/bge-large-en-v1.5",
  "@cf/unum/uform-gen2-qwen-500m",
  "@cf/openai/whisper-tiny-en",
  "@cf/openai/whisper-large-v3-turbo",
  "@cf/baai/bge-m3",
  "@cf/black-forest-labs/flux-1-schnell",
  "@cf/meta/llama-3.2-11b-vision-instruct",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-guard-3-8b",
  "@cf/baai/bge-reranker-base",
  "@cf/qwen/qwen2.5-coder-32b-instruct",
  "@cf/qwen/qwq-32b",
  "@cf/mistralai/mistral-small-3.1-24b-instruct",
  "@cf/google/gemma-3-12b-it",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
];

async function postQuote() {
  // Function to post a quote, api /quotes
  // Implementation will go here
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

  // loop the value in json
  console.log("Response data:", data);

  try {
    data = JSON.parse(data);
  } catch (e) {
    // postQuote();
    return;
  }
  console.log("get Quote successfully:", data);

  JSON.stringify(data);
  quote.value = data;
}

// Post the quote data

onMounted(() => {
  // Initial fetch or setup can be done here
  postQuote();
  console.log("Quote:", quote);
});
</script>
<template>
  <div>
    <select v-model="model">
      <option v-for="model in aiModels" :key="model" :value="model">
        {{ model }}
      </option>
    </select>
    <button @click="postQuote">Get Quote</button>
  </div>
  {{ failAiSet.value }}
  <transition name="fade" mode="out-in">
    <div v-if="quote.quote">
      <template v-if="quote.category">
        <h2>{{ quote.category }}</h2>
      </template>
      <blockquote v-if="quote.quote">
        <p>{{ quote.quote }}</p>

        <cite
          >{{ quote.name }},
          <template v-if="quote.source">
            {{ quote.source }}
          </template>
        </cite>
      </blockquote>
    </div>
  </transition>
</template>
