import { makeRequest } from "@/api/makeRequest.js";

export const getPayments = async () => {
    const response = await makeRequest('/payment');
    return response.json();
}
