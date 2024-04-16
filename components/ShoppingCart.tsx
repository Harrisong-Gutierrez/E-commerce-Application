import { Product } from "@/utils/supabase/types";
import React from "react";

interface ShoppingCartProps {
  cart: Product[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart }) => {
  function renderShoppingCart() {
    return cart.map((product) => (
      <li key={product.id}>
        {product.name} - ${product.price}
      </li>
    ));
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>{renderShoppingCart()}</ul>
      )}
    </div>
  );
};

export default ShoppingCart;
