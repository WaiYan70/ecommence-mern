import React from "react";

type OrdersProps = {
  token: string;
};

const Orders: React.FC<OrdersProps> = ({ token }) => {
  return (
    <div>
      <div>The </div>
      <div>Order</div>
    </div>
  );
};

export default Orders;
