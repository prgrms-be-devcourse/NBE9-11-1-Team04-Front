'use client';

import { useEffect, useState } from 'react';
import ErrorMessage from '@/components/order-admin/ErrorMessage';
import OrderDetailModal from '@/components/order-admin/OrderDetailModal';
import OrderStatusSelect from '@/components/order-admin/OrderStatusSelect';
import { cancelOrder, getOrders, updateOrderStatus } from '@/lib/orders/orderApi';
import { toAppError } from '@/lib/errors/appError';
import { ORDER_STATUS_LABELS, Order, OrderStatus } from '@/types/order';

export default function OrderAdminTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);
      setErrorMessage('');

      const orderList = await getOrders();
      setOrders(orderList);
    } catch (error) {
      const appError = toAppError(error);
      setErrorMessage(appError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(orderId: number, status: OrderStatus) {
    try {
      setUpdatingOrderId(orderId);
      setErrorMessage('');

      const updatedOrder = await updateOrderStatus(orderId, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      setSelectedOrder((prevSelectedOrder) =>
        prevSelectedOrder && prevSelectedOrder.id === orderId ? updatedOrder : prevSelectedOrder
      );
    } catch (error) {
      const appError = toAppError(error);
      setErrorMessage(appError.message);
    } finally {
      setUpdatingOrderId(null);
    }
  }

  async function handleCancelOrder(orderId: number) {
    const confirmed = window.confirm('정말 이 주문을 취소하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      setErrorMessage('');

      const cancelledOrder = await cancelOrder(orderId);

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? cancelledOrder : order))
      );

      setSelectedOrder((prevSelectedOrder) =>
        prevSelectedOrder && prevSelectedOrder.id === orderId ? cancelledOrder : prevSelectedOrder
      );
    } catch (error) {
      const appError = toAppError(error);
      setErrorMessage(appError.message);
    } finally {
      setCancellingOrderId(null);
    }
  }

  return (
    <>
      <section
        style={{
          backgroundColor: '#f7f4f2',
          borderRadius: '0px',
          padding: '28px 28px 36px',
          boxShadow: '0 8px 18px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div
          style={{
            marginBottom: '18px',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9b8b82',
            }}
          >
            Order Admin
          </p>
          <h2
            style={{
              margin: '8px 0 0 0',
              fontSize: '36px',
              fontWeight: 800,
              color: '#241915',
            }}
          >
            주문 관리
          </h2>
          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '15px',
              color: '#6f625c',
            }}
          >
            주문 목록 확인, 상태 변경, 상세 모달 테스트를 위한 화면입니다.
          </p>
        </div>

        <div
          style={{
            marginBottom: '16px',
            fontSize: '15px',
            fontWeight: 700,
            color: '#241915',
          }}
        >
          총 주문 수 {orders.length}
        </div>

        {errorMessage && <ErrorMessage message={errorMessage} />}

        {loading ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #d8ccc6',
              padding: '30px',
              textAlign: 'center',
              color: '#6f625c',
            }}
          >
            주문 목록을 불러오는 중입니다...
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px dashed #cdbdb5',
              padding: '30px',
              textAlign: 'center',
              color: '#6f625c',
            }}
          >
            표시할 주문이 없습니다.
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #2b2b2b',
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                tableLayout: 'fixed',
                fontSize: '14px',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: '#f8f4f2',
                    color: '#1f1f1f',
                    borderBottom: '2px solid #4b2619',
                  }}
                >
                  <Th width="12%">주문 번호</Th>
                  <Th width="14%">회원 ID</Th>
                  <Th width="22%">주문 시간</Th>
                  <Th width="14%">총 금액</Th>
                  <Th width="18%">처리상태</Th>
                  <Th width="20%">액션</Th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const isUpdating = updatingOrderId === order.id;
                  const isCancelling = cancellingOrderId === order.id;
                  const isCancelled = order.status === 'CANCELLED';

                  return (
                    <tr
                      key={order.id}
                      style={{
                        borderTop: '1px solid #2b2b2b',
                        backgroundColor: '#ffffff',
                      }}
                    >
                      <Td>{order.id}</Td>
                      <Td>{order.userId}</Td>
                      <Td>{formatDate(order.ordered_at)}</Td>
                      <Td>{order.totalPrice.toLocaleString()}원</Td>
                      <Td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#5a4941',
                            }}
                          >
                            {ORDER_STATUS_LABELS[order.status]}
                          </div>

                          <OrderStatusSelect
                            value={order.status}
                            disabled={isUpdating || isCancelling || isCancelled}
                            onChange={(nextStatus) => handleStatusChange(order.id, nextStatus)}
                          />
                        </div>
                      </Td>
                      <Td>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            style={{
                              width: '100%',
                              border: 'none',
                              borderRadius: '8px',
                              backgroundColor: '#2f2f2f',
                              color: '#ffffff',
                              padding: '10px 12px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor: 'pointer',
                            }}
                          >
                            상세 보기
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={isCancelling || isCancelled}
                            style={{
                              width: '100%',
                              border: '1px solid #c2410c',
                              borderRadius: '8px',
                              backgroundColor: isCancelling || isCancelled ? '#f3f4f6' : '#fff7ed',
                              color: isCancelling || isCancelled ? '#9ca3af' : '#c2410c',
                              padding: '10px 12px',
                              fontSize: '13px',
                              fontWeight: 700,
                              cursor:
                                isCancelling || isCancelled ? 'not-allowed' : 'pointer',
                            }}
                          >
                            {isCancelled ? '취소 완료' : isCancelling ? '취소 중...' : '주문 취소'}
                          </button>
                        </div>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
}

function Th({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <th
      style={{
        width,
        textAlign: 'center',
        padding: '14px 12px',
        fontWeight: 800,
        fontSize: '14px',
        borderRight: '1px solid #2b2b2b',
      }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        padding: '14px 12px',
        verticalAlign: 'middle',
        textAlign: 'center',
        color: '#1f1f1f',
      }}
    >
      {children}
    </td>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}