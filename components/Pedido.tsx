import React from "react";
import { Product } from "@/utils/supabase/types";

interface Order {
  id: string;
  products: Product[];
  shippingAddress: string;
  paymentMethod: string;
  status: string; // Puedes agregar más estados según tu necesidad
}

interface OrderProps {
  order: Order;
}

const Pedido: React.FC<OrderProps> = ({ order }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Order ID: {order.id}</h2>
      <h3 className="text-lg font-semibold mb-2">Products:</h3>
      <ul>
        {order.products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <p className="mb-2">Shipping Address: {order.shippingAddress}</p>
      <p className="mb-2">Payment Method: {order.paymentMethod}</p>
      <p className="mb-2">Status: {order.status}</p>
    </div>
  );
};

export default Pedido;
