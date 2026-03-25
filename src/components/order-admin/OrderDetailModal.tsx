'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ORDER_STATUS_LABELS, Order } from '@/types/order';

interface OrderDetailModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  const portalTarget = typeof document !== 'undefined' ? document.body : null;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!portalTarget) {
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
        backgroundColor: 'rgba(33, 16, 11, 0.58)',
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
          maxWidth: '860px',
          maxHeight: '84vh',
          overflow: 'hidden',
          borderRadius: '18px',
          backgroundColor: '#f7f4f2',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.28)',
          border: '1px solid rgba(75, 38, 25, 0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: '24px 28px 20px',
            borderBottom: '1px solid #e8ddd7',
            backgroundColor: '#ffffff',
          }}
        >
          <div>
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
              Order Detail
            </p>
            <h2
              style={{
                margin: '8px 0 0 0',
                fontSize: '34px',
                fontWeight: 800,
                color: '#1f1f1f',
                lineHeight: 1.1,
              }}
            >
              주문 상세
            </h2>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '14px',
                color: '#7b6d65',
              }}
            >
              주문 ID: {order.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#2f2f2f',
              color: '#ffffff',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            닫기
          </button>
        </div>

        <div
          style={{
            overflowY: 'auto',
            padding: '24px 28px 28px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
            }}
          >
            <InfoCard label="주문 ID" value={String(order.id)} />
            <InfoCard label="회원 ID" value={String(order.userId)} />
            <InfoCard label="주문 상태" value={ORDER_STATUS_LABELS[order.status] ?? order.status} />
            <InfoCard label="총 금액" value={`${order.totalPrice.toLocaleString()}원`} />
          </div>

          <div style={{ marginTop: '14px' }}>
            <InfoCard label="이메일" value={order.email || '-'} fullWidth />
          </div>

          <div style={{ marginTop: '14px' }}>
            <InfoCard label="주소" value={order.address || '-'} fullWidth />
          </div>

          <div style={{ marginTop: '14px' }}>
            <InfoCard label="주문 일시" value={order.orderedAt || '-'} fullWidth />
          </div>

          <section style={{ marginTop: '28px' }}>
            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '20px',
                fontWeight: 800,
                color: '#241915',
              }}
            >
              주문 상품
            </h3>

            {!order.orderProducts || order.orderProducts.length === 0 ? (
              <div
                style={{
                  border: '1px solid #ddd3ce',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  padding: '22px',
                  textAlign: 'center',
                  color: '#7b6d65',
                  fontSize: '14px',
                }}
              >
                주문 상품 데이터가 없습니다.
              </div>
            ) : (
              <div
                style={{
                  overflow: 'hidden',
                  border: '1px solid #ddd3ce',
                  borderRadius: '14px',
                  backgroundColor: '#ffffff',
                }}
              >
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '14px',
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: '#eee7e3',
                      color: '#5a4941',
                    }}
                  >
                    <tr>
                      <Th>orderId</Th>
                      <Th>productName</Th>
                      <Th>quantity</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderProducts.map((item, index) => (
                      <tr
                        key={`${item.productId}-${index}`}
                        style={{
                          borderTop: '1px solid #f0e7e2',
                          color: '#2d2d2d',
                        }}
                      >
                        <Td>{order.id}</Td>
                        <Td>{item.productName || '-'}</Td>
                        <Td>{item.quantity ?? 0}</Td>
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
    portalTarget
  );
}

interface InfoCardProps {
  label: string;
  value: string;
  fullWidth?: boolean;
}

function InfoCard({ label, value, fullWidth = false }: InfoCardProps) {
  return (
    <div
      style={{
        width: fullWidth ? '100%' : undefined,
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        border: '1px solid #ddd3ce',
        padding: '16px',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '12px',
          fontWeight: 700,
          color: '#9b8b82',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        {label}
      </p>
      <p
        style={{
          margin: '10px 0 0 0',
          fontSize: '15px',
          fontWeight: 600,
          color: '#1f1f1f',
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
        padding: '14px 16px',
        fontWeight: 700,
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
        padding: '14px 16px',
      }}
    >
      {children}
    </td>
  );
}
