import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infraestructure/product/database/model/sequelize/Product.model';
import { ProductRepository } from '../../../infraestructure/product/repository/sequelize/ProductRepository';
import { CreateProductUseCase } from './CreateProduct';

describe('[Integration] CreateProduct UseCase', () => {
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

  it('should be able to create a product', async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const input = {
      name: 'Product 1',
      price: 100,
    };

    const output = await useCase.execute(input);

    const expected = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    expect(output).toEqual(expected);
  });
});
