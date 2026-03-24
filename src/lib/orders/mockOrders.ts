import { Order } from '@/types/order';

export const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    totalPrice: 10000,
    ordered_at: '2026-03-23T14:38:39.106859',
    status: 'PENDING',
    orderProducts: [
      {
        orderId: 1,
        productId: 101,
        quantity: 2,
      },
      {
        orderId: 1,
        productId: 102,
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    totalPrice: 18500,
    ordered_at: '2026-03-24T09:15:10.000000',
    status: 'SHIPPED',
    orderProducts: [
      {
        orderId: 2,
        productId: 201,
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    totalPrice: 22000,
    ordered_at: '2026-03-24T11:42:55.000000',
    status: 'DELIVERED',
    orderProducts: [
      {
        orderId: 3,
        productId: 301,
        quantity: 2,
      },
      {
        orderId: 3,
        productId: 302,
        quantity: 3,
      },
    ],
  },
  {
    id: 4,
    userId: 4,
    totalPrice: 10000,
    ordered_at: '2026-03-24T13:20:00.000000',
    status: 'CANCELLED',
    orderProducts: [],
  },
];
