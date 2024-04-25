import { addOrders } from "@/app/services/orderCalls";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/utils/supabase/client";
import { getShoppingCarts } from "@/app/services/shoppingCartCalls";

interface CheckoutFormProps {
  onConfirm: (address: string, payment: string) => void;
  onClose: () => void;
  cleanProducts: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onConfirm,
  onClose,
  cleanProducts,
}) => {
  const supabase = createClient();

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderstate, setOrderState] = useState("in progress");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(shippingAddress, paymentMethod);
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id as string;
  };

  const getCartId = async () => {
    try {
      const result = await getShoppingCarts();
      return result[0].id;
    } catch (error) {
      console.error("Failed to fetch Shopping CartId:", error);
    }
  };

  let cartData = localStorage.getItem("cart");

  const createOrder = async () => {
    console.log(cartData);
    const userId = await getUser();
    let cartId: any = await getCartId();

    const OrderDetailsData = {
      id: uuidv4(),
      user_id: userId,
      cart_id: cartId,
      total: 1,
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      order_status: orderstate,
      order_date: "2024-04-24 21:34:50.734013",
    };

    try {
      localStorage.removeItem("cart");
      const result = await addOrders(OrderDetailsData);
      cleanProducts();
    } catch (error) {
      console.error("Failed to add Cart Details Data:", error);
    }
  };

  useEffect(() => {
    setOrderState("delivered");
  }, [createOrder]);

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="shippingAddress"
            className="block text-gray-700 font-bold mb-2"
          >
            Shipping Address:
          </label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your shipping address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-gray-700 font-bold mb-2"
          >
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a payment method</option>
            <option value="PayPal">PayPal</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bitcoin">Bitcoin</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            onClick={createOrder}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
