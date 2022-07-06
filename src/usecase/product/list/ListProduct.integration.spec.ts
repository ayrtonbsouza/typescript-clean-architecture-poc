import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../domain/product/entities/Product';
import { ProductModel } from '../../../infraestructure/product/database/model/sequelize/Product.model';
import { ProductRepository } from '../../../infraestructure/product/repository/sequelize/ProductRepository';
import { ListProductUseCase } from './ListProduct';

describe('[Integration] ListProduct UseCase', () => {
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

  it('should be able to list all products', async () => {
    const firstProduct = new Product('1234567890', 'Product 1', 10.0);
    const secondProduct = new Product('1234567891', 'Product 2', 20.0);
    const productRepository = new ProductRepository();
    await productRepository.create(firstProduct);
    await productRepository.create(secondProduct);

    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toBe(firstProduct.name);
    expect(output.products[1].name).toBe(secondProduct.name);
  });
});
