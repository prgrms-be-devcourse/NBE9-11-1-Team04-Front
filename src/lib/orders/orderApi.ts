import { toAppError } from '@/lib/errors/appError';
import { mockOrders } from '@/lib/orders/mockOrders';
import { Order, OrderStatus, RsData } from '@/types/order';

const USE_MOCK = true;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getOrdersFromMock(): Promise<Order[]> {
  await delay(300);
  return mockOrders;
}

async function updateOrderStatusFromMock(orderId: number, status: OrderStatus): Promise<Order> {
  await delay(300);

  const targetOrder = mockOrders.find((order) => order.id === orderId);

  if (!targetOrder) {
    throw new Error('주문을 찾을 수 없습니다.');
  }

  const updatedOrder: Order = {
    ...targetOrder,
    status,
  };

  return updatedOrder;
}

async function cancelOrderFromMock(orderId: number): Promise<Order> {
  await delay(300);

  const targetOrder = mockOrders.find((order) => order.id === orderId);

  if (!targetOrder) {
    throw new Error('주문을 찾을 수 없습니다.');
  }

  const cancelledOrder: Order = {
    ...targetOrder,
    status: 'CANCELLED',
  };

  return cancelledOrder;
}

async function getOrdersFromApi(): Promise<Order[]> {
  const response = await fetch('/api/v1/admin/orders', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('주문 목록 조회에 실패했습니다.');
  }

  const result: RsData<Order[]> = await response.json();
  return result.data;
}

async function updateOrderStatusFromApi(orderId: number, status: OrderStatus): Promise<Order> {
  const response = await fetch(`/api/v1/admin/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('주문 상태 변경에 실패했습니다.');
  }

  const result: RsData<Order> = await response.json();
  return result.data;
}

async function cancelOrderFromApi(orderId: number): Promise<Order> {
  const response = await fetch(`/api/v1/admin/orders/${orderId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('주문 취소에 실패했습니다.');
  }

  const result: RsData<Order> = await response.json();
  return result.data;
}

export async function getOrders(): Promise<Order[]> {
  try {
    if (USE_MOCK) {
      return await getOrdersFromMock();
    }

    return await getOrdersFromApi();
  } catch (error) {
    throw toAppError(error);
  }
}

export async function updateOrderStatus(orderId: number, status: OrderStatus): Promise<Order> {
  try {
    if (USE_MOCK) {
      return await updateOrderStatusFromMock(orderId, status);
    }

    return await updateOrderStatusFromApi(orderId, status);
  } catch (error) {
    throw toAppError(error);
  }
}

export async function cancelOrder(orderId: number): Promise<Order> {
  try {
    if (USE_MOCK) {
      return await cancelOrderFromMock(orderId);
    }

    return await cancelOrderFromApi(orderId);
  } catch (error) {
    throw toAppError(error);
  }
}