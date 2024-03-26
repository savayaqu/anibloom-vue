import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'))

    const setToken = (value) => {
        token.value = value
        localStorage.setItem('token', value)
    }

    return {
        setToken,
        token
    }
})