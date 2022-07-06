import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../domain/product/entities/Product';
import { ProductModel } from '../../../infraestructure/product/database/model/sequelize/Product.model';
import { ProductRepository } from '../../../infraestructure/product/repository/sequelize/ProductRepository';
import { UpdateProductUseCase } from './UpdateProduct';

describe('[Integration] UpdateProduct UseCase', () => {
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

  it('should be able to update a product', async () => {
    const product = new Product('1234567890', 'Product 1', 10.0);
    const productRepository = new ProductRepository();
    productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);

    const input = {
      id: '1234567890',
      name: 'Product 2',
      price: 20.0,
    };

    const expected = {
      id: '1234567890',
      name: 'Product 2',
      price: 20.0,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(expected);
  });
});
