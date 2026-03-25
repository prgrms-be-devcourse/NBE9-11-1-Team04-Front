'use client';

import React, { useState } from 'react';
import ErrorMessage from '@/components/order-admin/ErrorMessage';
import OrderDetailModal from '@/components/order-admin/OrderDetailModal';
import OrderStatusSelect from '@/components/order-admin/OrderStatusSelect';
import { toAppError } from '@/lib/errors/appError';
import { cancelOrder, updateOrderStatus } from '@/lib/orders/orderApi';
import { OrderDto, ORDER_STATUS_LABELS, OrderStatus } from '@/types/order';

interface AdminOrderTableProps {
  orders: OrderDto[];
  onOrderUpdated?: (updatedOrder: OrderDto) => void;
}

export default function AdminOrderTable({
  orders,
  onOrderUpdated,
}: AdminOrderTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);

  const handleStatusChange = async (orderId: number, nextStatus: OrderStatus) => {
    try {
      setUpdatingOrderId(orderId);
      setErrorMessage('');

      const updatedOrder = await updateOrderStatus(orderId, nextStatus);
      onOrderUpdated?.(updatedOrder);

      setSelectedOrder((prevSelectedOrder) =>
        prevSelectedOrder && prevSelectedOrder.id === orderId
          ? updatedOrder
          : prevSelectedOrder
      );
    } catch (error) {
      setErrorMessage(toAppError(error).message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    const confirmed = window.confirm('정말 이 주문을 취소하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      setErrorMessage('');

      const cancelledOrder = await cancelOrder(orderId);
      onOrderUpdated?.(cancelledOrder);

      setSelectedOrder((prevSelectedOrder) =>
        prevSelectedOrder && prevSelectedOrder.id === orderId
          ? cancelledOrder
          : prevSelectedOrder
      );
    } catch (error) {
      setErrorMessage(toAppError(error).message);
    } finally {
      setCancellingOrderId(null);
    }
  };

  return (
    <>
      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="pb-4 font-semibold text-gray-900 text-sm">주문 번호</th>
                <th className="pb-4 font-semibold text-gray-900 text-sm">주문자 정보</th>
                <th className="pb-4 font-semibold text-gray-900 text-sm">결제 금액</th>
                <th className="pb-4 font-semibold text-gray-900 text-sm">주문 일시</th>
                <th className="pb-4 font-semibold text-gray-900 text-sm">상태</th>
                <th className="pb-4 font-semibold text-gray-900 text-sm">관리</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    주문 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const isUpdating = updatingOrderId === order.id;
                  const isCancelling = cancellingOrderId === order.id;
                  const isCancelled = order.status === 'CANCELLED';

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 font-medium text-gray-900">#{order.id}</td>
                      <td className="py-4 text-gray-600">
                        <div className="font-medium text-gray-900">{order.email}</div>
                        <div className="text-xs text-gray-500">ID: {order.userId}</div>
                      </td>
                      <td className="py-4 font-bold text-gray-900">
                        {order.totalPrice.toLocaleString()}원
                      </td>
                      <td className="py-4 text-gray-500 text-xs">
                        {order.orderedAt
                          ? new Date(order.orderedAt).toLocaleString('ko-KR', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '-'}
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col gap-2">
                          <span
                            className={`w-fit px-2.5 py-1 rounded-md text-xs font-bold ${
                              order.status === 'PENDING'
                                ? 'bg-yellow-100 text-yellow-700'
                                : order.status === 'SHIPPED'
                                  ? 'bg-[#efe4dc] text-[#5d4035]'
                                  : order.status === 'CANCELLED'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {ORDER_STATUS_LABELS[order.status] ?? order.status}
                          </span>

                          {isCancelled ? (
                            <div className="max-w-[140px] rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-xs font-medium text-gray-500">
                              취소된 주문
                            </div>
                          ) : (
                            <div className="max-w-[140px]">
                              <OrderStatusSelect
                                value={order.status}
                                onChange={(nextStatus) =>
                                  handleStatusChange(order.id, nextStatus)
                                }
                                disabled={isUpdating || isCancelling}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex min-w-[88px] flex-col items-center gap-1.5 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center justify-center px-1 py-0.5 text-xs font-semibold text-gray-800 transition-colors hover:text-black"
                          >
                            상세보기
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={isCancelling || isCancelled}
                            className="inline-flex items-center justify-center px-1 py-0.5 text-xs font-medium text-rose-300 transition-colors hover:text-rose-500 disabled:cursor-not-allowed disabled:text-gray-400"
                          >
                            {isCancelled
                              ? '취소 완료'
                              : isCancelling
                                ? '취소 중...'
                                : '주문 취소'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder ? (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      ) : null}
    </>
  );
}
