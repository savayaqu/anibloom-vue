import {makeRequest} from "@/api/makeRequest.js";

export const loadOrder = async () => {
    const data = await makeRequest('/compound')

    return data.json()
}