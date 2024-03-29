import { makeRequest } from '@/api/makeRequest.js'
export const login = async (login, password) => {
    const response = await makeRequest(
        '/login',
        'POST',
        JSON.stringify({
            login,
            password
        })
    )
    return response.json()
}
