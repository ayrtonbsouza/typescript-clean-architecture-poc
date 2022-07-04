import { ICustomerRepository } from '../../../domain/customer/repositories/ICustomerRepository';
import { IInputFindCustomerDto, IOutputFindCustomerDto } from './dtos';

export class FindCustomerUseCase {
  private customerRepository: ICustomerRepository;
  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(input: IInputFindCustomerDto): Promise<IOutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

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
