import { CustomerFactory } from '../../../domain/customer/factories/Customer.factory';
import { Address } from '../../../domain/customer/value-object/Address';

const firstCustomer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Main St', 123, '12345', 'New York', 'NY')
);

const secondCustomer = CustomerFactory.createWithAddress(
  'Jane Doe',
  new Address('Second St', 321, '54321', 'Cupertino', 'CA')
);

const MockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  findAll: jest
    .fn()
    .mockReturnValue(Promise.resolve([firstCustomer, secondCustomer])),
});

describe('[Unit] List Customer Use Case', () => {
  it('should be able to list all customers', async () => {
    const respository = MockRepository();
    const useCase = new ListCustomerUseCase(respository);
    const output = await useCase.execute();

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].name).toBe(firstCustomer.name);
    expect(output.customers[1].name).toBe(secondCustomer.name);
    expect(output.customers[0].address.street).toBe(
      firstCustomer.address.street
    );
    expect(output.customers[1].address.street).toBe(
      secondCustomer.address.street
    );
  });
});
