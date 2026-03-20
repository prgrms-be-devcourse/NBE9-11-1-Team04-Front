import ProductCard from '@/components/ProductCard';
import Sidebar from '@/components/Sidebar';
import { Product, MenuItem } from '@/types/product';

// 상품 조회 (Product Fetching) 예시 함수
async function getProducts(): Promise<Product[]> {
  // 실제 환경에서는 fetch('api/products') 등을 사용함
  return Array(6).fill(null).map((_, i) => ({
    id: i,
    name: 'Text',
    price: 0,
    description: 'Body text.'
  }));
}

async function getMenuItems(): Promise<MenuItem[]> {
  return [
    { id: 1, label: 'Menu Label', description: 'Menu description.', iconType: 'tag', initialQuantity: 1 },
    { id: 2, label: 'Menu Label', description: 'Menu description.', iconType: 'tag', initialQuantity: 3 },
    { id: 3, label: 'Menu Label', description: 'Menu description.', iconType: 'star', initialQuantity: 0 },
    { id: 4, label: 'Menu Label', description: 'Menu description.', iconType: 'star', initialQuantity: 0 },
    { id: 5, label: 'Menu Label', description: 'Menu description.', iconType: 'star', initialQuantity: 0 },
  ];
}

export default async function HomePage() {
  const [products, menuItems] = await Promise.all([getProducts(), getMenuItems()]);

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 h-fit">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Right: Sidebar */}
        <aside className="lg:col-span-1">
          <Sidebar items={menuItems} />
        </aside>
      </div>
    </main>
  );
}