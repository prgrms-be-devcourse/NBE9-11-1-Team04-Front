export type OrderStatus = 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface RsData<T> {
  msg: string;
  resultCode: string;
  data: T;
}

export interface OrderProduct {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  ordered_at: string;
  status: OrderStatus;
  orderProducts: OrderProduct[];
}

export type OrderDto = Order;

export interface PageResponseDto<T> {
  content: T[];
  totalPages: number;
  totalElements?: number;
  size?: number;
  number?: number;
}

export interface OrderListParams {
  page?: number;
  size?: number;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: '주문 대기',
  SHIPPED: '배송중',
  DELIVERED: '배송 완료',
  CANCELLED: '주문 취소',
};
