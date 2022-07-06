import { CustomerFactory } from '../../../domain/customer/factories/Customer.factory';
import { Address } from '../../../domain/customer/value-object/Address';
import { UpdateCustomerUseCase } from './UpdateCustomer';

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Main st', 123, '12345', 'New York', 'NY')
);

const input = {
  id: customer.id,
  name: 'Jane Doe',
  address: {
    street: 'Second st',
    number: 321,
    zip: '54321',
    city: 'Cupertino',
    state: 'CA',
  },
};

const MockRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
});

describe('[Unit] UpdateCustomer UseCase', () => {
  it('should be able to update a customer', async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);
    expect(output).toEqual(input);
  });
});
