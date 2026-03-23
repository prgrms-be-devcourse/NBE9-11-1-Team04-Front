import ProductGrid from '@/components/ProductGrid';
import Sidebar from '@/components/Sidebar';
import { Product, CartItem } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  // 백엔드 연결 전 테스트 데이터 (category 포함)
  return [
    { id: 1, name: '아메리카노', price: 4500, description: '진한 에스프레소', category: 'COFFEE' },
    { id: 2, name: '카페라떼', price: 5000, description: '부드러운 우유', category: 'COFFEE' },
    { id: 3, name: '얼그레이', price: 5500, description: '향긋한 홍차', category: 'TEA' },
    { id: 4, name: '치즈케이크', price: 7000, description: '꾸덕한 치즈', category: 'DESSERT' },
    { id: 5, name: '녹차', price: 5500, description: '깔끔한 맛', category: 'TEA' },
    { id: 6, name: '초코쿠키', price: 3000, description: '달콤한 쿠키', category: 'DESSERT' },
  ];
}

async function getMenuItems(): Promise<CartItem[]> {
  return [
    { id: 101, label: 'Menu Label', description: 'Menu description.', iconType: 'tag', initialQuantity: 1 },
    { id: 102, label: 'Menu Label', description: 'Menu description.', iconType: 'tag', initialQuantity: 3 },
    { id: 103, label: 'Menu Label', description: 'Menu description.', iconType: 'star', initialQuantity: 0 },
    { id: 104, label: 'Menu Label', description: 'Menu description.', iconType: 'star', initialQuantity: 0 },
    { id: 105, label: 'Menu Label', description: 'Menu description.', iconType: 'star', initialQuantity: 0 },
  ];
}

export default async function HomePage() {
  const [products, menuItems] = await Promise.all([getProducts(), getMenuItems()]);

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 카테고리 탭과 상품 그리드가 합쳐진 컴포넌트 */}
        <ProductGrid initialProducts={products} />

        {/* 사이드바 */}
        <aside className="lg:col-span-1">
          <Sidebar items={menuItems} />
        </aside>
      </div>
    </main>
  );
}