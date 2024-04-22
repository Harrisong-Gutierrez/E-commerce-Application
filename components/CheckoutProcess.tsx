// import React, { useState } from "react";
// import CheckoutForm from "./CheckoutForm";
// import { Product } from "@/utils/supabase/types";

// interface CheckoutProcessProps {
//   cart: Product[];
//   onClose: () => void;
// }

// const CheckoutProcess: React.FC<CheckoutProcessProps> = ({ cart, onClose }) => {
//   const [shippingAddress, setShippingAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [confirmed, setConfirmed] = useState(false);

//   const handleConfirm = (address: string, payment: string) => {
//     setShippingAddress(address);
//     setPaymentMethod(payment);
//     setConfirmed(true);
//   };

//   return (
// <div className="container mx-auto py-8">
//   <h1 className="text-3xl font-semibold mb-4">Checkout Process</h1>
//   {!confirmed ? (
//     <CheckoutForm onConfirm={handleConfirm} onClose={onClose} />
//   ) : (
//     <div className="border rounded-lg p-4 bg-white shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Purchase Confirmed!</h2>
//       <p className="mb-2">Your order has been successfully processed.</p>
//       <h3 className="mb-2">Order Details:</h3>
//       <ul className="list-disc pl-4 mb-4">
//         {cart.map((product) => (
//           <li key={product.id}>
//             {product.name} - ${product.price}
//           </li>
//         ))}
//       </ul>
//       <p className="mb-4">Shipping Address: {shippingAddress}</p>
//       <p className="mb-4">Payment Method: {paymentMethod}</p>
//       <p className="mb-4">
//         Total Amount: $
//         {cart
//           .reduce((total, product) => total + product.price, 0)
//           .toFixed(2)}
//       </p>
//       <button
//         onClick={onClose}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Close
//       </button>
//     </div>
//   )}
// </div>
//   );
// };

// export default CheckoutProcess;

import React, { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Order, Product } from "@/utils/supabase/types";

interface CheckoutProcessProps {
  cart: Product[];
  onClose: () => void;
  onOrderComplete: (order: Order) => void;
}

const CheckoutProcess: React.FC<CheckoutProcessProps> = ({
  cart,
  onClose,
  onOrderComplete,
}) => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [confirmed, setConfirmed] = useState(false);


  const handleConfirm = (address: string, payment: string) => {
  // Crear el pedido
  const order: Order = {
    id: Math.random().toString(36).substring(7),
    products: cart,
    shippingAddress: address,
    paymentMethod: payment,
    status: "Pending",
  };

  // Verificar si onOrderComplete es una función antes de llamarla
  if (typeof onOrderComplete === 'function') {
    onOrderComplete(order);
  }

  // Cerrar el proceso de compra
  onClose();
};


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Checkout Process</h1>
      {!confirmed ? (
        <CheckoutForm onConfirm={handleConfirm} onClose={onClose} />
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
