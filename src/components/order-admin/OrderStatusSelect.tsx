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
        minWidth: '132px',
        height: '38px',
        borderRadius: '8px',
        border: '1px solid #2f2f2f',
        backgroundColor: disabled ? '#e5e7eb' : '#2f2f2f',
        color: disabled ? '#6b7280' : '#ffffff',
        padding: '0 12px',
        fontSize: '13px',
        fontWeight: 600,
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
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