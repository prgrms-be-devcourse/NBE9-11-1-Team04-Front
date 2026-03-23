import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react'; //react 아이콘 라이브러리
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

export default function AdminProductCard({ product }: { product: Product }) {
  return (
    <ProductCard product={product}>
        {/* 위에는 기존의 ProductCard재사용*/ }
      <div className="mt-3 flex justify-end gap-2">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
        >
          <Pencil className="w-4 h-4" />
        </Link>

        <Link
          href={`/admin/products/${product.id}/delete`}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
        >
          <Trash2 className="w-4 h-4" />
        </Link>
      </div>
    </ProductCard>
  );
}