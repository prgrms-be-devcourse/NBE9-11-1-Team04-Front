'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ORDER_STATUS_LABELS, Order } from '@/types/order';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      onClick={onClose}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="주문 상세 모달"
        style={{
          width: '100%',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflow: 'hidden',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #e5e7eb',
            padding: '20px 24px',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#9ca3af',
              }}
            >
              Order Detail
            </p>
            <h2
              style={{
                margin: '8px 0 0 0',
                fontSize: '24px',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              주문 상세
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: '1px solid #d1d5db',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <InfoCard label="주문 ID" value={String(order.id)} />
            <InfoCard label="회원 ID" value={String(order.userId)} />
            <InfoCard label="주문 상태" value={ORDER_STATUS_LABELS[order.status]} />
            <InfoCard label="총 금액" value={`${order.totalPrice.toLocaleString()}원`} />
            <div style={{ gridColumn: '1 / -1' }}>
              <InfoCard label="주문 일시" value={order.ordered_at} />
            </div>
          </div>

          <section>
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '16px',
                fontWeight: 700,
                color: '#111827',
              }}
            >
              주문 상품
            </h3>

            {order.orderProducts.length === 0 ? (
              <div
                style={{
                  border: '1px dashed #d1d5db',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '14px',
                }}
              >
                주문 상품 데이터가 없습니다.
              </div>
            ) : (
              <div
                style={{
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px',
                  }}
                >
                  <thead style={{ backgroundColor: '#f9fafb' }}>
                    <tr>
                      <Th>orderId</Th>
                      <Th>productId</Th>
                      <Th>quantity</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderProducts.map((item, index) => (
                      <tr key={`${item.orderId}-${item.productId}-${index}`}>
                        <Td>{item.orderId}</Td>
                        <Td>{item.productId}</Td>
                        <Td>{item.quantity}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>,
    document.body
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        backgroundColor: '#f9fafb',
        padding: '16px',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '12px',
          fontWeight: 600,
          color: '#6b7280',
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: '8px 0 0 0',
          fontSize: '14px',
          color: '#111827',
          wordBreak: 'break-all',
        }}
      >
        {value}
      </p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        textAlign: 'left',
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        color: '#4b5563',
        fontWeight: 600,
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
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        color: '#111827',
      }}
    >
      {children}
    </td>
  );
}