import { CustomerFactory } from '../../../domain/customer/factories/Customer.factory';
import { ICustomerRepository } from '../../../domain/customer/repositories/ICustomerRepository';
import { Address } from '../../../domain/customer/value-object/Address';
import { IInputCreateCustomerDto, IOutputCreateCustomerDto } from './dtos';

export class CreateCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: IInputCreateCustomerDto
  ): Promise<IOutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
        input.address.state
      )
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
        state: customer.address.state,
      },
    };
  }
}
