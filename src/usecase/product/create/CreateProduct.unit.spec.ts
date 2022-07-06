import { CreateProductUseCase } from './CreateProduct';

const input = {
  name: 'Product 1',
  price: 100,
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('[Unit] CreateProduct UseCase', () => {
  it('should be able to create a product', async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    const expected = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    expect(output).toEqual(expected);
  });
});
