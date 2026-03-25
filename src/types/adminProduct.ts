import { Product } from "./product";

export type CategoryType = 'COFFEE' | 'TEA' | 'DESSERT';

export interface AdminProduct extends Product{
  
    stock : number;
    imageUrl?: string;
}
