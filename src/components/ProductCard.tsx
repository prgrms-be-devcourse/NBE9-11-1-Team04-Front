import { Product } from '@/types/product';

export default function ProductCard({ product,children }: { product: Product, children?: React.ReactNode; }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm h-fit">
      <div className="bg-gray-200 aspect-square rounded-md mb-4 flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-lg font-bold text-gray-900">${product.price}</p>
        <p className="text-xs text-gray-500">{product.description}</p>
      </div>
      
    </div>
  );
}