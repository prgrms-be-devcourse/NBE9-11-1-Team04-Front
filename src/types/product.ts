export type CategoryType = 'COFFEE' | 'TEA' | 'DESSERT';

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: CategoryType;
}

export interface UserInfo {
    email: string;
    address: string;
    zipCode: string;
}

// 화면 표시용 한글 매핑 객체
export const CATEGORY_LABELS: Record<CategoryType | 'ALL', string> = {
    ALL: '전체',
    COFFEE: '커피',
    TEA: '차',
    DESSERT: '디저트',
};

export interface CartItem {
    id: number;
    name: string;
    description: string;
    initialQuantity?: number;
    price: number;
}

export interface ProductDto {
    id: number;
    name: string;
    price: number;
    category: CategoryType;
    description: string;
    imageUrl: string,
    created_at: string;
    modified_at: string;
}