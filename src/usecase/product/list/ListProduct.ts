import { IProductRepository } from '../../../domain/product/repositories/IProductRepository';

import { IInputListProductDto, IOutputListProductDto } from './dtos';
import { OutputMapper } from './util/OutputMapper';

export class ListProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: IInputListProductDto): Promise<IOutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}
