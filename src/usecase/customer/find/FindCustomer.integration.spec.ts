import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../../domain/customer/entities/Customer';
import { Address } from '../../../domain/customer/value-object/Address';
import { CustomerModel } from '../../../infraestructure/customer/database/model/Customer.model';
import { CustomerRepository } from '../../../infraestructure/customer/repository/CustomerRepository';
import { FindCustomerUseCase } from './FindCustomer';

describe('[Integration] FindCustomer UseCase', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to find a customer', async () => {
    const customer = new Customer('1234567890', 'John Doe');
    const address = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

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
});
