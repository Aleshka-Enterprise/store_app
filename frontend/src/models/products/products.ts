export interface ICategory {
  id: number;
  title: string;
  description?: string;
}

export interface IProduct {
  id: number;
  name: string;
  category: number;
  price: string;
  description: string;
  short_description: string;
  image: string;
}
