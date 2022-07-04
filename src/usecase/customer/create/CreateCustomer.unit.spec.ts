const input = {
  name: 'John Doe',
  address: {
    street: 'Main st',
    number: 123,
    zip: '12345',
    city: 'New York',
    state: 'NY',
  },
};

const MockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('[Unit] CreateCustomer UseCase', () => {
  it('should be able to create a customer', async () => {
    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    const expected = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city,
        state: input.address.state,
      },
    };

    expect(output).toEqual(expected);
  });
});
