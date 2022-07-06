import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../domain/product/entities/Product';
import { ProductModel } from '../../../infraestructure/product/database/model/sequelize/Product.model';
import { ProductRepository } from '../../../infraestructure/product/repository/sequelize/ProductRepository';

import { FindProductUseCase } from './FindProduct';

describe('[Integration] FindProduct UseCase', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to find a product', async () => {
    const product = new Product('1234567890', 'Product 1', 10.0);
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: '1234567890',
    };

    const expected = {
      id: '1234567890',
      name: 'Product 1',
      price: 10.0,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(expected);
  });
});
