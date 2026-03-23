'use client';

import { useState } from 'react';
import { Tag, Star, Minus, Plus } from 'lucide-react';
import { CartItem } from '@/types/product';

export default function Sidebar({ items }: { items: CartItem[] }) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.initialQuantity || 0 }), {})
  );

  const updateQty = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta)
    }));
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg sticky top-8">
      <div className="p-6">
        <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Heading</p>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Heading</h2>

        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex gap-3">
                {item.iconType === 'tag' ? <Tag className="w-5 h-5 text-gray-500 mt-1" /> : <Star className="w-5 h-5 text-gray-500 mt-1" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border rounded-md px-1 py-0.5">
                <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-semibold min-w-[16px] text-center">{quantities[item.id]}</span>
                <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t">
        <button className="w-full bg-[#2D2D2D] text-white py-3 rounded-md text-sm font-medium hover:bg-black transition-all active:scale-[0.98]">
          Save shipping information
        </button>
      </div>
    </div>
  );
}