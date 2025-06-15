<template>
  <div>
    <h1>Welcome to JamRoom</h1>
    <input v-model="newBand" placeholder="Band name" />
    <button @click="createBand">Create</button>
    <ul>
      <li v-for="band in bands" :key="band._id">{{ band.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const newBand = ref('')
const bands = ref([])
const owner = 'user123' // Replace with auth later

const fetchBands = async () => {
  const res = await fetch(`http://localhost:8080/api/bands/${owner}`)
  bands.value = await res.json()
}

const createBand = async () => {
  await fetch('http://localhost:8080/api/bands', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newBand.value, owner })
  })
  newBand.value = ''
  fetchBands()
}

onMounted(fetchBands)
</script>