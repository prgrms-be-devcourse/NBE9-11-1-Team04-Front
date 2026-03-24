import { toAppError } from '@/lib/errors/appError';
import { mockOrders } from '@/lib/orders/mockOrders';
import { Order, OrderStatus } from '@/types/order';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getOrders(): Promise<Order[]> {
  try {
    await delay(300);
    return mockOrders;
  } catch (error) {
    throw toAppError(error);
  }
}

export async function updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
  try {
    await delay(300);

    const targetOrder = mockOrders.find((order) => order.id === orderId);

    if (!targetOrder) {
      throw new Error('주문을 찾을 수 없습니다.');
    }

    return {
      ...targetOrder,
      status,
    };
  } catch (error) {
    throw toAppError(error);
  }
}
