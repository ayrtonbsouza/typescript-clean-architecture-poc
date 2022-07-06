import { ProductFactory } from '../../../domain/product/factories/Product.factory';
import { UpdateProductUseCase } from './UpdateProduct';

const product = ProductFactory.create('a', 'Product 1', 10);

const input = {
  id: product.id,
  name: product.name,
  price: product.price,
};

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
});

describe('[Unit] UpdateProduct UseCase', () => {
  it('should be able to update a product', async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);
    expect(output).toEqual(input);
  });
});
