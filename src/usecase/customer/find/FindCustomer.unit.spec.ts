import { Customer } from '../../../domain/customer/entities/Customer';
import { Address } from '../../../domain/customer/value-object/Address';
import { FindCustomerUseCase } from './FindCustomer';

const customer = new Customer('1234567890', 'John Doe');
const address = new Address('Main st', 123, '12345', 'New York', 'NY');
customer.changeAddress(address);

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(customer)),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('[Unit] FindCustomer UseCase', () => {
  it('should be able to find a customer', async () => {
    const customerRepository = MockRepository();

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: '1234567890',
    };

    const expected = {
      id: '1234567890',
      name: 'John Doe',
      address: {
        street: 'Main st',
        number: 123,
        zip: '12345',
        city: 'New York',
        state: 'NY',
      },
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(expected);
  });

  it('should receive an error when the customer is not found', () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const useCase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: '1234567890',
    };

    expect(() => useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});
