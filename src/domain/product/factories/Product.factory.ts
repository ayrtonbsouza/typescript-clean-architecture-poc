import { v4 as uuid } from 'uuid';
import { Product } from '../entities/Product';

export class ProductFactory {
  static create(type: string, name: string, price: number): Product {
    switch (type) {
      case 'a':
        return new Product(uuid(), name, price);
      default:
        throw new Error('Invalid product type');
    }
  }
}
