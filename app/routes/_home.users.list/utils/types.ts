export type TUser = {
  category: string;
  code: string;
  description: string;
  id: string | number;
  image: string;
  inventoryStatus: string;
  name: string;
  price?: number; // Optional price property
  quantity: number;
  rating: number;
};
