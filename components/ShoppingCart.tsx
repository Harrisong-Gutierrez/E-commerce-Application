import React from "react";
import { Product } from "@/utils/supabase/types";

interface ShoppingCartProps {
  cart: Product[];
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  onRemoveFromCart,
  onCheckout,
}) => {
  function renderShoppingCart() {
    return cart.map((product) => (
      <li
        key={product.id}
        className="flex items-center justify-between border-b border-gray-200 py-2"
      >
        <div className="flex items-center">
          <span className="font-medium mr-2">{product.name}</span>
          <span className="text-gray-500">${product.price}</span>
        </div>
        <button
          onClick={() => onRemoveFromCart(product.id)}
          className="text-red-500 hover:text-red-600"
        >
          Remove
        </button>
      </li>
    ));
  }

  function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <ul>{renderShoppingCart()}</ul>
          <div className="mt-4 flex justify-between items-center">
            <p className="font-medium text-lg">
              Total: <span className="text-blue-500">${calculateTotal()}</span>
            </p>
            <button
              onClick={onCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
