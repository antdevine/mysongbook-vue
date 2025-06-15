<template>
  <div class="p-4 max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Login / Register</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 rounded" />

      <div class="flex gap-2">
        <button @click="mode = 'login'" type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        <button @click="mode = 'register'" type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </div>
    </form>

    <div v-if="token" class="mt-6">
      <h3 class="text-xl font-semibold mb-2">Your Bands</h3>
      <ul>
        <li v-for="band in bands" :key="band._id" class="p-2 border rounded mb-1">
          {{ band.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const token = ref('')
const bands = ref([])
const mode = ref('login')

const handleSubmit = async () => {
  const endpoint = mode.value === 'register' ? 'http://localhost:8080/api/auth/register' : 'http://localhost:8080/api/auth/login'
  const res = await $fetch(endpoint, {
    method: 'POST',
    body: { email: email.value, password: password.value },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (mode.value === 'login') {
    token.value = res.token
    fetchBands()
  } else {
    alert('Registration successful. You can now log in.')
  }
}

const fetchBands = async () => {
  if (!token.value) return

  const res = await $fetch('http://localhost:8080/api/bands', {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  bands.value = res
}
</script>

<style scoped>
input {
  outline: none;
}
</style>
