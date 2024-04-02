import { makeRequest } from '@/api/makeRequest.js'
export const updateProfile = async (name, surname, patronymic, login, password, email, birth, telephone) => {
    const response = await makeRequest(
        '/profile',
        'PATCH',
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
