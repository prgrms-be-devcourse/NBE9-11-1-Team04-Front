import { toAppError } from '@/lib/errors/appError';
import { mockOrders } from '@/lib/orders/mockOrders';
import {
  Order,
  OrderListParams,
  OrderStatus,
  PageResponseDto,
  RsData,
} from '@/types/order';

const USE_MOCK = false;
const API_BASE_URL = 'http://localhost:8080';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getOrdersPageFromMock({
  page = 0,
  size = 10,
}: OrderListParams = {}): Promise<PageResponseDto<Order>> {
  await delay(300);

  const startIndex = page * size;
  const endIndex = startIndex + size;

  return {
    content: mockOrders.slice(startIndex, endIndex),
    totalPages: Math.ceil(mockOrders.length / size),
    totalElements: mockOrders.length,
    size,
    number: page,
  };
}

async function updateOrderStatusFromMock(orderId: number, status: OrderStatus): Promise<Order> {
  await delay(300);

  const targetOrder = mockOrders.find((order) => order.id === orderId);

  if (!targetOrder) {
    throw new Error('주문을 찾을 수 없습니다.');
  }

  return {
    ...targetOrder,
    status,
  };
}

async function cancelOrderFromMock(orderId: number): Promise<Order> {
  await delay(300);

  const targetOrder = mockOrders.find((order) => order.id === orderId);

  if (!targetOrder) {
    throw new Error('주문을 찾을 수 없습니다.');
  }

  return {
    ...targetOrder,
    status: 'CANCELLED',
  };
}

async function getOrdersPageFromApi({
  page = 0,
  size = 10,
}: OrderListParams = {}): Promise<PageResponseDto<Order>> {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/orders?page=${page}&size=${size}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('주문 목록 조회에 실패했습니다.');
  }

  const result: RsData<PageResponseDto<Order>> = await response.json();
  return result.data;
}

async function updateOrderStatusFromApi(orderId: number, status: OrderStatus): Promise<Order> {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/orders/${orderId}`, {
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
  const response = await fetch(`${API_BASE_URL}/api/v1/admin/orders/${orderId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('주문 취소에 실패했습니다.');
  }

  const result: RsData<Order> = await response.json();
  return result.data;
}

export async function getOrdersPage(
  params: OrderListParams = {}
): Promise<PageResponseDto<Order>> {
  try {
    if (USE_MOCK) {
      return await getOrdersPageFromMock(params);
    }

    return await getOrdersPageFromApi(params);
  } catch (error) {
    throw toAppError(error);
  }
}

export async function getOrders(params: OrderListParams = {}): Promise<Order[]> {
  const result = await getOrdersPage(params);
  return result.content;
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
