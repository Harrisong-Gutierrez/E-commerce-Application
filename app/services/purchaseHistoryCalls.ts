import axios from 'axios';



export interface PurchaseData {
    id: string;
    user_id: string;
    product_id: string;
    purchase_date: string


}

export const addPurchaseHistory = async (purchaseData: PurchaseData) => {
    try {
        const response = await axios.post(`/api/purchase_history`, purchaseData);
        return response.data;
    } catch (error) {
        console.error('Error adding purchase history:', error);
        throw new Error('Failed to add purchase history');
    }
};
