import {makeRequest} from "@/api/makeRequest.js";

export const createCategory = async (name) => {
    const data = await makeRequest(
        `/admin/category/create`,
        'POST',
        JSON.stringify({
            name: name,
        })
    )

    return data.json()
}