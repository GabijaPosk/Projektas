export const generateUniqueId = () => {
    return Date.now().toString(36);
  };
  export const confirmOrder = (orders, confirmedOrder) => {
    return orders.map((order) => (order.id === confirmedOrder.id ? { ...order, ...confirmedOrder } : order));
  };
  export const cancelOrder = (orders, orderId) => {
    return orders.filter((order) => order.id !== orderId);
  };