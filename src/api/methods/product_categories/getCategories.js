import { makeRequest } from "@/api/makeRequest.js";

export const getCategories = async () => {
    const response = await makeRequest('/categories');
    return response.json();
}
