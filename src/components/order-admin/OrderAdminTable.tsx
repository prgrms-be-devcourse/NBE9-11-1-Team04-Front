'use client';

import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/order-admin/ErrorMessage';
import OrderDetailModal from '@/components/order-admin/OrderDetailModal';
import OrderStatusSelect from '@/components/order-admin/OrderStatusSelect';
import { AppError, toAppError } from '@/lib/errors/appError';
import { getOrders, updateOrderStatus } from '@/lib/orders/orderApi';
import { ORDER_STATUS_LABELS, Order, OrderStatus } from '@/types/order';

export default function OrderAdminTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        setError(toAppError(error));
      } finally {
        setLoading(false);
      }
    };

    void loadOrders();
  }, []);

  const handleStatusChange = async (orderId: number, nextStatus: OrderStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setError(null);

      const updatedOrder = await updateOrderStatus(orderId, nextStatus);

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      setSelectedOrder((prevSelectedOrder) =>
        prevSelectedOrder && prevSelectedOrder.id === orderId ? updatedOrder : prevSelectedOrder
      );
    } catch (error) {
      setError(toAppError(error));
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">주문 관리 테스트</h1>
        <p className="mt-1 text-sm text-gray-500">
          주문 상세 모달과 상태 변경 UI를 확인하는 임시 화면입니다.
        </p>
      </div>

      <ErrorMessage error={error} />

      {loading ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
          주문 목록을 불러오는 중입니다.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">주문 ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">회원 ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">총 금액</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">주문 일시</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">현재 상태</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">상태 변경</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">상세</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-gray-900">{order.id}</td>
                  <td className="px-4 py-3 text-gray-900">{order.userId}</td>
                  <td className="px-4 py-3 text-gray-900">{order.totalPrice.toLocaleString()}원</td>
                  <td className="px-4 py-3 text-gray-900">{order.ordered_at}</td>
                  <td className="px-4 py-3 text-gray-900">{ORDER_STATUS_LABELS[order.status]}</td>
                  <td className="px-4 py-3">
                    <OrderStatusSelect
                      value={order.status}
                      disabled={updatingOrderId === order.id}
                      onChange={(nextStatus) => handleStatusChange(order.id, nextStatus)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      상세 보기
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    </div>
  );
}
