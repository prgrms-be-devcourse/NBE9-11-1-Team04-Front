import AdminProductGrid from '@/components/AdminProductGrid';
import AdminSidebar from '@/components/AdminSidebar';
import { Product } from '@/types/product';

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

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8"> 
        {/* 관리자용 상품 리스트 */}
        <AdminProductGrid initialProducts={products} />

        {/* 관리자 사이드바 */}
        <aside className="lg:col-span-1">
          <AdminSidebar />
        </aside>

      </div>
    </main>
  );
}