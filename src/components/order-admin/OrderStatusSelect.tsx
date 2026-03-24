'use client';

import { ORDER_STATUS_LABELS, OrderStatus } from '@/types/order';

interface OrderStatusSelectProps {
  value: OrderStatus;
  disabled?: boolean;
  onChange: (nextStatus: OrderStatus) => void;
}

const ORDER_STATUS_OPTIONS: OrderStatus[] = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function OrderStatusSelect({
  value,
  disabled = false,
  onChange,
}: OrderStatusSelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value as OrderStatus)}
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100"
    >
      {ORDER_STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {ORDER_STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}
