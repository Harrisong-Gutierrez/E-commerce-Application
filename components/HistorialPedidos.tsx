import React, { useState, useEffect } from "react";
import Pedido from "./Pedido";
import { Order } from "@/utils/supabase/types";

interface HistorialPedidosProps {
  orders: Order[];
}

const HistorialPedidos: React.FC<HistorialPedidosProps> = ({ orders }) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No order history available.</p>
      ) : (
        orders.map((order) => <Pedido key={order.id} order={order} />)
      )}
    </div>
  );
};

export default HistorialPedidos;
