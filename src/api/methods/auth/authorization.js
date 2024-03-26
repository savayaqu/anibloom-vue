import { makeRequest } from '@/api/makeRequest.js'
export const authorization = async (email, password) => {
    const response = await makeRequest(
        '/authorization',
        'POST',
        JSON.stringify({
            password,
            email
        })
    )
    return response.json()
}
