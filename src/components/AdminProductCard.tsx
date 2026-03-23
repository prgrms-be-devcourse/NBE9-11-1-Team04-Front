import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react'; //react 아이콘 라이브러리
import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminProductCard({ product }: { product: Product }) {
    const router = useRouter();
    
    const handleDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
      
      
        alert("삭제 완료");
        router.refresh();
        
      };
    return (
    <ProductCard product={product}>
       
      <div className="mt-3 flex justify-end gap-2">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
        >
          <Pencil className="w-4 h-4" />
        </Link>

        <button onClick={() => handleDelete(product.id)}
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100">
                <Trash2 className="w-4 h-4" />
    </button>
      </div>
    </ProductCard>
  );
}