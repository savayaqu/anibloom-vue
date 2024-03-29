import { makeRequest } from '@/api/makeRequest.js'
export const register = async (name, surname, patronymic, login, password, email, birth, telephone) => {
    const response = await makeRequest(
        '/register',
        'POST',
        JSON.stringify({
            name,
            surname,
            patronymic,
            login,
            password,
            email,
            birth,
            telephone
        })
    )

    return response.json()
}
