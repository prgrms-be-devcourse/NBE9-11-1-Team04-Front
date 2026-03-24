import ProductWrapper from '@/components/ProductWrapper';
import { Product, CartItem } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  const response = await fetch('http://localhost:8080/api/v1/products', {
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('상품 데이터를 가져오는데 실패했습니다.');
  }

  const products = await response.json();

  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      {/* quantity를 useState로 함께 관리하기 위해 client 페이지 추가 */}
      <ProductWrapper products={products}></ProductWrapper>
    </main>
  );
}