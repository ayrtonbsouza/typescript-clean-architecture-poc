import { ProductFactory } from '../../../domain/product/factories/Product.factory';
import { IProductRepository } from '../../../domain/product/repositories/IProductRepository';
import { IInputCreateProductDto, IOutputCreateProductDto } from './dtos';

export class CreateProductUseCase {
  private productRepository: IProductRepository;
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    input: IInputCreateProductDto
  ): Promise<IOutputCreateProductDto> {
    const product = ProductFactory.create('a', input.name, input.price);
    await this.productRepository.create(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
