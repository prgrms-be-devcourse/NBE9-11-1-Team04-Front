'use client';

import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import { AdminProduct } from '@/types/adminProduct';

export default function AdminProductCard({ 
  adminProduct,
  onDelete }: { 
  adminProduct: AdminProduct 
  onDelete : (id:number) => Promise<void>}) {
  

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await onDelete(id);
    
  };

  return (
    <>
      <div className="bg-white rounded-lg p-4 shadow-sm h-fit">
        <div className="bg-gray-200 aspect-square rounded-md mb-4 flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900">{adminProduct.name}</h3>
          <p className="text-lg font-bold text-gray-900">${adminProduct.price}</p>
          <p className="text-xs text-gray-500">{adminProduct.description}</p>
          <p className="text-xs text-gray-500">재고:{adminProduct.stock}</p>

          <div className="mt-3 flex justify-end gap-2">
            <Link
              href={`/admin/products/${adminProduct.id}/edit`}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
            >
              <Pencil className="w-4 h-4" />
            </Link>

            <button
              onClick={() => handleDelete(adminProduct.id)}
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}