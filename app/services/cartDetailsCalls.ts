import axios from 'axios';


export interface CartDetailsData {
    id: string;
    cart_id: string;
    product_id: string;
    quantity: number

}


export const addCartDetails = async (cartDetailsData: CartDetailsData) => {
    try {
        const response = await axios.post(`/api/cart_details`, cartDetailsData);
        return response.data;
    } catch (error) {
        console.error('Error adding Cart Details:', error);
        throw error;
    }
}
