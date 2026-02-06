export interface RawMaterial {
  id?: number;
  name: string;
  stockQuantity: number;
}

export interface ProductComponent {
  id?: number;
  rawMaterial: RawMaterial;
  requiredQuantity: number;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  components: ProductComponent[];
}

export interface ProductionSuggestion {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}