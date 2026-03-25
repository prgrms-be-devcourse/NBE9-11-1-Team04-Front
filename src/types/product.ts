export type CategoryType = 'NUTTY' | 'FRUITY' | 'DECAF';

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
    NUTTY: '커피',
    FRUITY: '차',
    DECAF: '디저트',
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
