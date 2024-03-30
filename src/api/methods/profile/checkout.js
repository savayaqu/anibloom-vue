import {makeRequest} from "@/api/makeRequest.js";

export const checkout = async (newAddress, paymentId) => {
    const data = await makeRequest(
        `/checkout`,
        'POST',
        JSON.stringify({
            address: newAddress,
            payment_id: paymentId
        })
    )

    return data.json()
}