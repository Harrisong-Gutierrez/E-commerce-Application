import React from "react";
import { Product } from "@/utils/supabase/types";

interface CheckoutProcessProps {
  cart: Product[];
  address: string;
  onClose: () => void;
}

const CheckoutProcess: React.FC<CheckoutProcessProps> = ({
  cart,
  address,
  onClose,
}) => {
  const confirmPurchase = () => {
    onClose();
  };

  const renderConfirmationMessage = () => {
    const order = {
      products: cart,
      shippingAddress: address,
      paymentMethod: "Credit Card",
    };

    const total = order.products.reduce(
      (acc, product) => acc + product.price,
      0
    );

    return (
      <div className="border rounded-lg p-4 bg-white shadow-md">
        <h2 className="text-lg font-semibold mb-4">Purchase Confirmed!</h2>
        <p className="mb-2">Your order has been successfully processed.</p>
        <h3 className="mb-2">Order Details:</h3>
        <ul className="list-disc pl-4 mb-4">
          {order.products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
        <p className="mb-2">Shipping Address: {order.shippingAddress}</p>
        <p className="mb-2">Payment Method: {order.paymentMethod}</p>
        <p className="mb-4">Total Amount: ${total.toFixed(2)}</p>
        <button
          onClick={confirmPurchase}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>{" "}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Purchase Process</h1>
      {renderConfirmationMessage()}
    </div>
  );
};

export default CheckoutProcess;
