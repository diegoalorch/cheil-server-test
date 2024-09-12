export interface ProductModel {
  id?            : number;
  categoryId     : number;
  name           : string;
  description    : string;
  price          : number;
  priceDiscount  : number;
  quantity       : number;
  imageUrl?      : string;
  status         : string;
  createdAt?     : Date;
  updatedAt?     : Date;
}
