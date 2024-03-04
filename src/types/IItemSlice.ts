export interface IItem {
  id: string;
  price: number;
  brand: string;
  product: string;
}

export interface IResult<T> {
  result: T;
}

export interface IItemsState {
  items: IItem[];
  ids: string[];
  isLoading: boolean;
}
