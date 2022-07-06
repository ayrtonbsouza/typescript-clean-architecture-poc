import { Product } from '../../../domain/product/entities/Product';
import { FindProductUseCase } from './FindProduct';

const product = new Product('1234567890', 'Product 1', 25.99);

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('[Unit] FindProduct UseCase', () => {
  it('should be able to find a product', async () => {
    const productRepository = MockRepository();

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: '1234567890',
    };

    const expected = {
      id: '1234567890',
      name: 'Product 1',
      price: 25.99,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(expected);
  });
});
