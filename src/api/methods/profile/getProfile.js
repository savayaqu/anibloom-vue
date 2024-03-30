import { makeRequest } from "@/api/makeRequest.js";

export const getProfile = async () => {
    const response = await makeRequest('/profile');
    return response.json();
}
