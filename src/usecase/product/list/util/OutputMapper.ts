import { Product } from '../../../../domain/product/entities/Product';
import { IOutputListProductDto } from '../dtos';

export class OutputMapper {
  static toOutput(product: Product[]): IOutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
