import { ProductFactory } from '../../../domain/product/factories/Product.factory';
import { ListProductUseCase } from './ListProduct';

const firstProduct = ProductFactory.create('a', 'Product 1', 10);
const secondProduct = ProductFactory.create('a', 'Product 2', 20);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  findAll: jest
    .fn()
    .mockReturnValue(Promise.resolve([firstProduct, secondProduct])),
});

describe('[Unit] ListProduct UseCase', () => {
  it('should be able to list all products', async () => {
    const productRepository = MockRepository();
    const useCase = new ListProductUseCase(productRepository);
    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toBe(firstProduct.name);
    expect(output.products[1].name).toBe(secondProduct.name);
  });
});
