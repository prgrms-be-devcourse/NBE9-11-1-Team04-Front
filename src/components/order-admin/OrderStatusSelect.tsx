'use client';

import { ORDER_STATUS_LABELS, OrderStatus } from '@/types/order';

interface OrderStatusSelectProps {
  value: OrderStatus;
  onChange: (value: OrderStatus) => void;
  disabled?: boolean;
}

const ORDER_STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'SHIPPED', 'DELIVERED'];

export default function OrderStatusSelect({
  value,
  onChange,
  disabled = false,
}: OrderStatusSelectProps) {
  return (
    <select
      value={value === 'CANCELLED' ? 'DELIVERED' : value}
      onChange={(event) => onChange(event.target.value as OrderStatus)}
      disabled={disabled}
      style={{
        width: '100%',
        minWidth: '138px',
        height: '34px',
        borderRadius: '8px',
        border: disabled ? '1px solid #d1d5db' : '1px solid #d6c8c1',
        backgroundColor: disabled ? '#f3f4f6' : '#fffaf7',
        color: disabled ? '#9ca3af' : '#3b2a24',
        padding: '0 10px',
        fontSize: '12px',
        fontWeight: 600,
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.04)',
      }}
    >
      {ORDER_STATUS_OPTIONS.map((status) => (
        <option
          key={status}
          value={status}
          style={{
            backgroundColor: '#ffffff',
            color: '#111827',
          }}
        >
          {ORDER_STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}
