import { ICustomerRepository } from '../../../domain/customer/repositories/ICustomerRepository';
import { Address } from '../../../domain/customer/value-object/Address';
import { IInputUpdateCustomerDto, IOutputUpdateCustomerDto } from './dtos';

export class UpdateCustomerUseCase {
  private customerRepository: ICustomerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: IInputUpdateCustomerDto
  ): Promise<IOutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city,
        input.address.state
      )
    );
    await this.customerRepository.update(customer);
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
