export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

export interface MenuItem {
    id: number;
    label: string;
    description: string;
    initialQuantity?: number;
    iconType: 'tag' | 'star';
}