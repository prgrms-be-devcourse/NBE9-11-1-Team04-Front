'use client';

import { useState } from 'react';
import { CategoryType, CATEGORY_LABELS } from '@/types/product';
import AdminProductCard from './AdminProductCard';
import { AdminProduct } from '@/types/adminProduct';

const TABS: (CategoryType | 'ALL')[] = ['ALL', 'COFFEE', 'TEA', 'DESSERT'];

export default function AdminProductGrid({
  initialProducts,
  onDelete,
}: {
  initialProducts: AdminProduct[];
  onDelete: (id:number) => Promise<void>;
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType | 'ALL'>('ALL');

  const filteredProducts =
    selectedCategory === 'ALL'
      ? initialProducts
      : initialProducts.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="flex gap-2 p-1 bg-[#3D2B24] rounded-lg w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedCategory(tab)}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              selectedCategory === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {CATEGORY_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 h-fit">
        {filteredProducts.map((adminProduct) => (
          <AdminProductCard key={adminProduct.id} 
          adminProduct={adminProduct} 
          onDelete={onDelete}/>
        ))}
      </div>
    </div>
  );
}