import axios from 'axios';



export interface OrderData {
    id: string,
    user_id: string,
    cart_id: string,
    total: number,
    shipping_address: string,
    payment_method: string,
    order_status: string,
    order_date: string
}

export const addOrders = async (orderData: OrderData) => {
    try {
        const response = await axios.post(`/api/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error adding Order Data:', error);
        throw error;
    }
}
