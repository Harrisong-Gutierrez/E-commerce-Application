import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Product } from "@/utils/supabase/types";
import { Bounce, toast } from "react-toastify";

interface CheckoutProcessProps {
  cart: Product[];
  onClose: () => void;
  cleanProducts: () => void;
  updateHasAddedToCart: () => void;
}

const CheckoutProcess: React.FC<CheckoutProcessProps> = ({
  cart,
  onClose,
  cleanProducts,
  updateHasAddedToCart,
}) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = (address: string, payment: string) => {
    setShippingAddress(address);
    setPaymentMethod(payment);
    setConfirmed(true);

    toast.success("the purchase has been made successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout Process</h1>
      {!confirmed ? (
        <CheckoutForm
          onConfirm={handleConfirm}
          onClose={onClose}
          cleanProducts={cleanProducts}
          updateHasAddedToCart={updateHasAddedToCart}
        />
      ) : (
        <div className="border rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Purchase Confirmed!</h2>
          <p className="mb-2">Your order has been successfully processed.</p>
          <h3 className="mb-2">Order Details:</h3>
          <ul className="list-disc pl-4 mb-4">
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price}
              </li>
            ))}
          </ul>
          <p className="mb-4">Shipping Address: {shippingAddress}</p>
          <p className="mb-4">Payment Method: {paymentMethod}</p>
          <p className="mb-4">
            Total Amount: $
            {cart
              .reduce((total, product) => total + product.price, 0)
              .toFixed(2)}
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutProcess;
