import { IProductRepository } from '../../../domain/product/repositories/IProductRepository';
import { IInputFindProductDto, IOutputFindProductDto } from './dtos';

export class FindProductUseCase {
  private productRepository: IProductRepository;
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: IInputFindProductDto): Promise<IOutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
