import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('api_token'))
    const tokenValue = localStorage.getItem('api_token')

    const setToken = (value) => {
        token.value = value
        localStorage.setItem('api_token', value)
    }

    return {
        setToken,
        token
    }
})